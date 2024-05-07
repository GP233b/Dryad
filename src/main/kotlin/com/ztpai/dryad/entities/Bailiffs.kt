package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.id.IntIdTable


object Bailiffs : IntIdTable() {
    val baiName = varchar("bai_name", 255)
    val baiSurname = varchar("bai_surname", 255)
    val baiPhoneNumber = integer("bai_name")
    val baiOfficeLocation = varchar("bai_office_location", 255)
}