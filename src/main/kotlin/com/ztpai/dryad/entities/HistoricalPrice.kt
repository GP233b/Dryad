package com.ztpai.dryad.entities

import com.ztpai.dryad.entities.RealEstatePicture.Companion.referrersOn
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.kotlin.datetime.datetime
import java.math.BigDecimal

class HistoricalPrice (id: EntityID<Int>) : IntEntity(id)  {
    companion object : IntEntityClass<HistoricalPrice>(HistoricalPrices)

    var hisPrice = HistoricalPrices.hisPrice
    var hisDate = HistoricalPrices.hisDate


    var userData by UserData referencedOn HistoricalPrices.hisUrdId
    var auction by Auction referencedOn HistoricalPrices.hisAucId
}

