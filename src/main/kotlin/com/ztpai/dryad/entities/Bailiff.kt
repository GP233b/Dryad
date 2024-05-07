package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class Bailiff (id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Bailiff>(Bailiffs)
    var baiName = Bailiffs.baiName
    var baiSurname = Bailiffs.baiSurname
    var baiPhoneNumber = Bailiffs.baiPhoneNumber
    var baiOfficeLocation = Bailiffs.baiOfficeLocation

    val auctions by Auction referrersOn Auctions.aucBaiId

}

