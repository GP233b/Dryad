package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class Auction(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Auction>(Auctions)

    var aucWinningPrice by Auctions.aucWinningPrice
    var aucEndDate by Auctions.aucEndDate

    var bailiff by Bailiff referencedOn Auctions.aucBaiId
    var userData by UserData referencedOn Auctions.aucWinnerId
    var realEstate by RealEstate referencedOn Auctions.aucRelId

    val historicalPrice by HistoricalPrice referrersOn HistoricalPrices.hisAucId
    val realEstatePicture by RealEstatePicture referrersOn RealEstatePictures.repAucId
}