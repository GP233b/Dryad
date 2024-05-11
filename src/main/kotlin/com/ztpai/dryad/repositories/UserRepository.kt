package com.ztpai.dryad.repositories

import com.ztpai.dryad.entities.UserData
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository


@Repository
class UserRepository {
    fun findById(id: Int): UserDto? {
        return transaction {
            UserData.findById(id)?.toDto()
        }
    }

    fun findByEmail(email: String): UserData? {
        return transaction {
            UserData.findByEmail(email)
        }
    }

    fun save(user: UserData): UserData {
        return transaction {
            user.flush()
            user
        }
    }

    fun deleteById(id: Int) {
        transaction {
            val user = UserData.findById(id)
            user?.delete()
        }
    }
}

data class UserDto(
        val id: Int,
        val urdEmail: String,
        val urdName: String,
        val urdSurname: String,
        val urdPesel: String
)

fun UserData.toDto() = UserDto(
        id = id.value,
        urdEmail = urdEmail,
        urdName = urdName,
        urdSurname = urdSurname,
        urdPesel = urdPesel
)

