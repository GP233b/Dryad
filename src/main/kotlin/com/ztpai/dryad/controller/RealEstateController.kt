package com.ztpai.dryad.controller

import com.ztpai.dryad.entities.RealEstate
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/realestates")
class RealEstateController {

    @PostMapping("/add")
    fun addRealEstate(@RequestBody request: AddRealEstateRequest): ResponseEntity<Map<String,Int>> {

        return transaction {

            val realEstateNew = RealEstate.new {
                relStartingPrice = request.startingPrice
                relEstimatedPrice = request.estimatedPrice
                relLandAndMortgageRegisterNumber = request.landAndMortgageRegisterNumber
                relGeoportalNumber = request.geoportalNumber
                relDescription = request.description
            }
            ResponseEntity.ok(mapOf("id" to realEstateNew.id.value))
        }

    }
}

data class AddRealEstateRequest(
        val startingPrice: java.math.BigDecimal,
        val estimatedPrice: java.math.BigDecimal,
        val landAndMortgageRegisterNumber: String,
        val geoportalNumber: String,
        val description: String
)
