package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.id.IntIdTable

object RealEstatePictures: IntIdTable() {
    val repAucId = reference("auc_id",Auctions)
    val repPicture = varchar("rep_picture",255)


}