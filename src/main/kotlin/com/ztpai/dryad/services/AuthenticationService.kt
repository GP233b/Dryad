package com.ztpai.dryad.services


import com.ztpai.dryad.dtos.LoginUserDto
import com.ztpai.dryad.dtos.RegisterUserDto
import com.ztpai.dryad.entities.UserData
import com.ztpai.dryad.repositories.UserDto
import com.ztpai.dryad.repositories.UserRepository
import com.ztpai.dryad.repositories.toDto
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


@Service
class AuthenticationService(
        private val userRepository: UserRepository,
        private val authenticationManager: AuthenticationManager,
        private val passwordEncoder: PasswordEncoder
) {
    fun signup(input: RegisterUserDto): UserDto? {


        return transaction {   UserData.new {
            urdEmail = input.email
            urdName = input.name
            urdSurname = input.surname
            urdPesel = input.pesel
            urdPassword = input.password

        }.toDto()

        }



    }

    fun authenticate(input: LoginUserDto): UserData? {
        authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        input.email,
                        input.password
                )
        )
        return userRepository.findByEmail(input.email)

    }
}