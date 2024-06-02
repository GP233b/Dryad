package com.ztpai.dryad.controller

import com.ztpai.dryad.entities.Auction
import com.ztpai.dryad.entities.RealEstatePicture
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


data class AddRealEstatePictureRequest(
        val picture: String,
        val auctionId: Int
)
@RestController
@RequestMapping("/realEstatePictures")
class RealEstatePictureController {

    @PostMapping("/add")
    fun addRealEstatePicture(@RequestBody request: AddRealEstatePictureRequest): ResponseEntity<String> {
        println(request.auctionId)
        transaction {
            val addAuction = Auction.findById(request.auctionId)

            if(addAuction == null){
                println(addAuction)
            }
            else{

            RealEstatePicture.new {
                repPicture = "/pictures/" +  request.picture
                auction = addAuction
            }
                }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Real Estate Picture added successfully")
    }



}


