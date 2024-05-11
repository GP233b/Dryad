package com.ztpai.dryad.entities


import org.jetbrains.exposed.dao.id.IntIdTable


object UsersData: IntIdTable() {

    val urdName = varchar("urd_name",255)
    val urdSurname = varchar("urd_surname",255)
    val urdPesel = varchar("urd_pesel",255)
    val urdEmail = varchar("urd_email",255)
    val urdPassword = varchar("urd_password",255)

}