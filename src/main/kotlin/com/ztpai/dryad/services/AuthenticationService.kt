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
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


@Service
class AuthenticationService(
        private val userRepository: UserRepository,
        private val authenticationManager: AuthenticationManager,
        private val passwordEncoder: PasswordEncoder
) {
    fun signup(input: RegisterUserDto): UserDto? {
        return transaction {
            val hashedPassword = passwordEncoder.encode(input.password)
            val newUser = UserData.new {
                urdEmail = input.email
                urdName = input.name
                urdSurname = input.surname
                urdPesel = input.pesel
                urdPassword = hashedPassword
            }
            newUser.toDto()
        }
    }


    fun authenticate(input: LoginUserDto): UserData? {
        try {
            authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            input.email,
                            input.password
                    )
            )
        } catch (e: AuthenticationException) {

            println("Wystąpił błąd podczas uwierzytelniania: ${e.message}")
            return null
        }
        return userRepository.findByEmail(input.email)

    }
}