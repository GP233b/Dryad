package com.ztpai.dryad.entities

import com.ztpai.dryad.entities.RealEstatePicture.Companion.referrersOn
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.kotlin.datetime.datetime
import java.math.BigDecimal

class Auction(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Auction>(Auctions)

    var aucWinningPrice = Auctions.aucWinningPrice
    var aucEndDate = Auctions.aucEndDate

    var bailiff by Bailiff referencedOn Auctions.aucBaiId
    var userData by UserData referencedOn Auctions.aucWinnerId
    var realEstate by RealEstate referencedOn  Auctions.aucRelId

    val historicalPrice by HistoricalPrice referrersOn HistoricalPrices.hisAucId
    val realEstatePicture by RealEstatePicture referrersOn  RealEstatePictures.repAucId

}



