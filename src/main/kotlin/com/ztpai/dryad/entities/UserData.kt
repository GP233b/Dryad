package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

class UserData (id: EntityID<Int>) : IntEntity(id)   {
    companion object : IntEntityClass<UserData>(UsersData)

    var urdName = UsersData.urdName
    var urdSurname = UsersData.urdSurname
    var urdDateOfBirth = UsersData.urdDateOfBirth
    var urdPesel = UsersData.urdPesel

    val auction by Auction referrersOn Auctions.aucWinnerId
    val historicalPrice by HistoricalPrice referrersOn  HistoricalPrices.hisUrdId


}