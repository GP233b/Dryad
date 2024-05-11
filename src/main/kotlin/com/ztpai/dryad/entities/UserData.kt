package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.springframework.security.core.GrantedAuthority


import org.springframework.security.core.userdetails.UserDetails

class UserData(id: EntityID<Int>) : IntEntity(id),UserDetails  {



    companion object : IntEntityClass<UserData>(UsersData) {
        fun findByEmail(email: String): UserData? {
            return UserData.find { UsersData.urdEmail eq email }.singleOrNull()
        }
    }

    var urdName by UsersData.urdName
    var urdSurname by UsersData.urdSurname
    var urdPesel by UsersData.urdPesel
    var urdEmail by UsersData.urdEmail
    var urdPassword by UsersData.urdPassword



    val auction by Auction referrersOn Auctions.aucWinnerId
    val historicalPrice by HistoricalPrice referrersOn HistoricalPrices.hisUrdId
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf();
    }

    override fun getPassword(): String {
        return urdPassword;
    }

    override fun getUsername(): String {
        return urdEmail;
    }

    override fun isAccountNonExpired(): Boolean {
        return true;
    }

    override fun isAccountNonLocked(): Boolean {
        return true;
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true;
    }

    override fun isEnabled(): Boolean {
        return true;
    }
}
