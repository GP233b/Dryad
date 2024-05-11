package com.ztpai.dryad.controller

import com.ztpai.dryad.repositories.UserDto
import com.ztpai.dryad.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController {

    @Autowired
    lateinit var userRepository: UserRepository


    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Int): UserDto? {
        return userRepository.findById(id)
    }

    /*
    @PostMapping("/")
    fun addUser(@RequestBody user: UserData): UserData {
        return userRepository.save(user)
    }


    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Int, @RequestBody newUser: UserData): UserData {
        val existingUser = userRepository.findById(id)
        if (existingUser != null) {

            existingUser.apply {
                urdName = newUser.urdName
                urdSurname = newUser.urdSurname
                urdEmail = newUser.urdEmail
                urdDateOfBirth = newUser.urdDateOfBirth
                urdPassword = newUser.urdPassword
                urdPesel = newUser.urdPesel
            }
            return userRepository.save(existingUser)
        }
        throw RuntimeException("User not found with id $id")
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: Int) {
        userRepository.deleteById(id)
    }

     */
}