package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Column
import java.math.BigDecimal

class RealEstate (id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<RealEstate>(RealEstates)


    var relStartingPrice= RealEstates.relStartingPrice
    var relEstimatedPrice = RealEstates.relEstimatedPrice
    var relLandAndMortgageRegisterNumber = RealEstates.relLandAndMortgageRegisterNumber
    var relGeoportalNumber = RealEstates.relGeoportalNumber
    var relDescription = RealEstates.relDescription

    val auction by Auction referrersOn Auctions.aucRelId
}
