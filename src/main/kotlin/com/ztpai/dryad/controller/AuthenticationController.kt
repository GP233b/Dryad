package com.ztpai.dryad.controller

import com.ztpai.dryad.dtos.LoginUserDto
import com.ztpai.dryad.dtos.RegisterUserDto
import com.ztpai.dryad.entities.UserData
import com.ztpai.dryad.repositories.UserDto
import com.ztpai.dryad.services.AuthenticationService
import com.ztpai.dryad.services.JwtService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RequestMapping("/auth")
@RestController
class AuthenticationController(private val jwtService: JwtService, private val authenticationService: AuthenticationService) {
    @PostMapping("/signup")
    fun register(@RequestBody registerUserDto: RegisterUserDto?): ResponseEntity<UserDto?> {
        val registeredUser: UserDto? = authenticationService.signup(registerUserDto!!)
        return ResponseEntity.ok(registeredUser)
    }

    @PostMapping("/login")
    fun authenticate(@RequestBody loginUserDto: LoginUserDto): ResponseEntity<out Any> {
        val authenticatedUser: UserData? = authenticationService.authenticate(loginUserDto)
        val jwtToken = if (authenticatedUser != null) {
            jwtService.generateToken(authenticatedUser as UserDetails)
        } else {
            return ResponseEntity<String>("Access Denied", HttpStatus.FORBIDDEN)
        }

        val loginResponse = LoginResponse().apply {
            token = jwtToken
            expiresIn = jwtService.expirationTime
            role = authenticatedUser.urdRole
        }
        return ResponseEntity.ok<LoginResponse>(loginResponse)
    }
}




class LoginResponse {

    var token: String? = null
    var expiresIn: Long = 0
    var role: String? = null
}