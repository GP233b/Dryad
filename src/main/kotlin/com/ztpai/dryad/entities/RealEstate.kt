package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class RealEstate(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<RealEstate>(RealEstates)

    var relStartingPrice by RealEstates.relStartingPrice
    var relEstimatedPrice by RealEstates.relEstimatedPrice
    var relLandAndMortgageRegisterNumber by RealEstates.relLandAndMortgageRegisterNumber
    var relGeoportalNumber by RealEstates.relGeoportalNumber
    var relDescription by RealEstates.relDescription

    val auction by Auction referrersOn Auctions.aucRelId
}
