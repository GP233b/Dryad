package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object UsersData: IntIdTable() {
    val urdName = varchar("urd_name",255)
    val urdSurname = varchar("urd_surname",255)
    val urdDateOfBirth = datetime("urd_date_of_birth")
    val urdPesel = varchar("urd_pesel",255)

}