package com.ztpai.dryad.controller

import com.ztpai.dryad.entities.Auction
import com.ztpai.dryad.entities.Auctions
import com.ztpai.dryad.entities.UserData
import com.ztpai.dryad.repositories.UserDto
import com.ztpai.dryad.repositories.UserRepository
import com.ztpai.dryad.repositories.toDto
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/users")
@RestController
class UserController(){

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Int): ResponseEntity<UserDto> {
        val user = userRepository.findById(id)
        return if (user != null) {
            ResponseEntity(user, HttpStatus.OK)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/me")
    fun authenticatedUser(): ResponseEntity<UserDto> {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication

        val currentUser: UserData = authentication.principal as UserData

        val userDto = currentUser.toDto()

        return ResponseEntity.ok(userDto)
    }

    @GetMapping("/")
    fun allUsers(): ResponseEntity<List<UserDto>> {
        val users: List<UserDto> = userRepository.findAll().map { it.toDto() }

        return ResponseEntity.ok(users)
    }

    @RequestMapping("/{userId}/won-auctions")
    fun getWonAuctions(@PathVariable userId: Int): ResponseEntity<List<AuctionResponse>> {
        val wonAuctions = transaction {
            Auction.find { Auctions.aucWinnerId eq userId }
                    .map { auction ->
                        val bailiff = auction.bailiff
                        val pictures = auction.realEstatePicture.map {
                            RealEstatePictureDTO(it.id.value, it.repPicture)
                        }
                        val realEstate = auction.realEstate

                        AuctionResponse(
                                auction = AuctionDTO(
                                        auction.id.value,
                                        auction.aucWinningPrice,
                                        auction.aucEndDate.toString(),
                                        auction.userData.id.value
                                ),
                                bailiff = BailiffDTO(bailiff.id.value, bailiff.baiName, bailiff.baiSurname, bailiff.baiPhoneNumber, bailiff.baiOfficeLocation),
                                pictures = pictures,
                                realEstate = RealEstateDTO(
                                        realEstate.id.value,
                                        realEstate.relStartingPrice,
                                        realEstate.relEstimatedPrice,
                                        realEstate.relLandAndMortgageRegisterNumber,
                                        realEstate.relGeoportalNumber,
                                        realEstate.relDescription
                                ),
                                winnerId = auction.userData.id.value
                        )
                    }
        }

        return ResponseEntity(wonAuctions, HttpStatus.OK)
    }
}