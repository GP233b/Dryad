package com.ztpai.dryad

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DryadApplication

fun main(args: Array<String>) {

    runApplication<DryadApplication>(*args)


   /* transaction {
        // Znajdź użytkownika o danym ID
        val userId = 1
        val user = UserData.findById(userId)

        // Jeśli użytkownik istnieje, wyprintuj jego dane
        if (user != null) {
            println("User Data for ID $userId:")
            println("Name: ${user.urdName}")
            println("Surname: ${user.urdSurname}")
            println("Date of Birth: ${user.urdDateOfBirth}")
            println("PESEL: ${user.urdPesel}")
            println("Email: ${user.urdEmail}")
            println("Password: ${user.urdPassword}")
        } else {
            println("User with ID $userId not found.")
        }
    }
*/

}
