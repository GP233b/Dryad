package com.ztpai.dryad.controller

import com.ztpai.dryad.entities.Auction
import com.ztpai.dryad.entities.UserData
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal

data class AuctionResponse(
        val auction: AuctionDTO,
        val bailiff: BailiffDTO,
        val pictures: List<RealEstatePictureDTO>,
        val realEstate: RealEstateDTO,
        val winnerId: Int
)


data class NewPriceRequest(
        val newPrice: BigDecimal,
        val userId: Int
)
data class AuctionDTO(
        val id: Int,
        val winningPrice: BigDecimal,
        val endDate: String,
        val winnerId: Int
)

data class BailiffDTO(
        val id: Int,
        val name: String,
        val surname: String,
        val phoneNumber: Int,
        val officeLocation: String
)

data class RealEstatePictureDTO(
        val id: Int,
        val picture: String
)

data class RealEstateDTO(
        val id: Int,
        val startingPrice: BigDecimal,
        val estimatedPrice: BigDecimal,
        val landAndMortgageRegisterNumber: String,
        val geoportalNumber: String,
        val description: String
)

@RestController
@RequestMapping("/auctions")
class AuctionController {

    @GetMapping("/{id}")
    fun getAuctionById(@PathVariable id: Int): ResponseEntity<AuctionResponse> {
        val auctionResponse = transaction {
            val auction = Auction.findById(id)
            if (auction == null) {
                return@transaction ResponseEntity.notFound().build()
            }

            val bailiff = auction.bailiff
            val pictures = auction.realEstatePicture.map {
                RealEstatePictureDTO(it.id.value, it.repPicture)
            }
            val realEstate = auction.realEstate

            val winnerId = auction.userData?.id?.value ?: -1 // Jeśli auction.userData?.id?.value jest nullem, to ustawiamy winnerId na -1

            ResponseEntity.ok(
                    AuctionResponse(
                            auction = AuctionDTO(
                                    auction.id.value,
                                    auction.aucWinningPrice,
                                    auction.aucEndDate.toString(),
                                    winnerId
                            ),
                            bailiff = BailiffDTO(bailiff.id.value, bailiff.baiName, bailiff.baiSurname, bailiff.baiPhoneNumber, bailiff.baiOfficeLocation),
                            pictures = pictures,
                            realEstate = RealEstateDTO(
                                    realEstate.id.value, realEstate.relStartingPrice, realEstate.relEstimatedPrice,
                                    realEstate.relLandAndMortgageRegisterNumber, realEstate.relGeoportalNumber, realEstate.relDescription
                            ),
                            winnerId = winnerId
                    )
            )
        }

        return auctionResponse ?: ResponseEntity.notFound().build()
    }

    @GetMapping
    fun getAllAuctions(): ResponseEntity<List<AuctionResponse>> {
        val auctions = transaction {
            Auction.all().map { auction ->
                val bailiff = auction.bailiff
                val pictures = auction.realEstatePicture.map {
                    RealEstatePictureDTO(it.id.value, it.repPicture)
                }
                val realEstate = auction.realEstate

                val winnerId = auction.userData?.id?.value ?: -1 // Jeśli auction.userData?.id?.value jest nullem, to ustawiamy winnerId na -1

                AuctionResponse(
                        auction = AuctionDTO(
                                auction.id.value,
                                auction.aucWinningPrice,
                                auction.aucEndDate.toString(),
                                winnerId
                        ),
                        bailiff = BailiffDTO(bailiff.id.value, bailiff.baiName, bailiff.baiSurname, bailiff.baiPhoneNumber, bailiff.baiOfficeLocation),
                        pictures = pictures,
                        realEstate = RealEstateDTO(
                                realEstate.id.value, realEstate.relStartingPrice, realEstate.relEstimatedPrice,
                                realEstate.relLandAndMortgageRegisterNumber, realEstate.relGeoportalNumber, realEstate.relDescription
                        ),
                        winnerId = winnerId
                )
            }
        }

        return ResponseEntity.ok(auctions)
    }


    @PutMapping("/{id}/updatePrice")
    fun updateAuctionPrice(@PathVariable id: Int, @RequestBody request: NewPriceRequest): ResponseEntity<String> {
        return try {
            transaction {
                val auction = Auction.findById(id) ?: return@transaction ResponseEntity.notFound().build()

                if (request.newPrice <= BigDecimal.ZERO || request.newPrice.scale() > 2) {
                    return@transaction ResponseEntity.badRequest().body("Invalid price format.")
                }

                val user = UserData.findById(request.userId) ?: return@transaction ResponseEntity.notFound().build()

                if (request.newPrice > auction.aucWinningPrice) {
                    auction.aucWinningPrice = request.newPrice
                    auction.userData = user
                    auction.flush()
                    ResponseEntity.ok("Auction price updated successfully.")
                } else {
                    ResponseEntity.badRequest().body("New price must be higher than the current winning price.")
                }
            }
        } catch (e: Exception) {
            println("Error occurred: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the auction price.")
        }
    }




}
