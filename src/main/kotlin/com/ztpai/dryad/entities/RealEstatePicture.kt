package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class RealEstatePicture (id: EntityID<Int>) : IntEntity(id)  {
    companion object : IntEntityClass<RealEstatePicture>(RealEstatePictures)

    var repPicture = RealEstatePictures.repPicture

    var auction by Auction referencedOn RealEstatePictures.repAucId
}