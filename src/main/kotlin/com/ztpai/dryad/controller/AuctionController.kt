package com.ztpai.dryad.controller

import com.ztpai.dryad.entities.Auction
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal

data class AuctionResponse(
        val auction: AuctionDTO,
        val bailiff: BailiffDTO,
        val pictures: List<RealEstatePictureDTO>,
        val realEstate: RealEstateDTO
)

data class AuctionDTO(val id: Int, val winningPrice: BigDecimal, val endDate: String)
data class BailiffDTO(val id: Int, val name: String, val surname: String, val phoneNumber: Int, val officeLocation: String)
data class RealEstatePictureDTO(val id: Int, val picture: String)
data class RealEstateDTO(
        val id: Int, val startingPrice: BigDecimal, val estimatedPrice: BigDecimal,
        val landAndMortgageRegisterNumber: String, val geoportalNumber: String, val description: String
)

@RestController
@RequestMapping("/auctions")
class AuctionController {

    @GetMapping("/{id}")
    fun getAuctionById(@PathVariable id: Int): ResponseEntity<AuctionResponse> {
        val auctionResponse = transaction {
            val auction = Auction.findById(id)
            if (auction == null) {
                return@transaction null
            }

            val bailiff = auction.bailiff
            val pictures = auction.realEstatePicture.map {
                RealEstatePictureDTO(it.id.value, it.repPicture)
            }
            val realEstate = auction.realEstate

            AuctionResponse(
                    auction = AuctionDTO(auction.id.value, auction.aucWinningPrice, auction.aucEndDate.toString()),
                    bailiff = BailiffDTO(bailiff.id.value, bailiff.baiName, bailiff.baiSurname, bailiff.baiPhoneNumber, bailiff.baiOfficeLocation),
                    pictures = pictures,
                    realEstate = RealEstateDTO(
                            realEstate.id.value, realEstate.relStartingPrice, realEstate.relEstimatedPrice,
                            realEstate.relLandAndMortgageRegisterNumber, realEstate.relGeoportalNumber, realEstate.relDescription
                    )
            )
        }

        return if (auctionResponse != null) {
            ResponseEntity(auctionResponse, HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}
