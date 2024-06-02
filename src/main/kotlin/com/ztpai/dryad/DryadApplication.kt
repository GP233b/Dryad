package com.ztpai.dryad


import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DryadApplication

fun main(args: Array<String>) {

   runApplication<DryadApplication>(*args)

/*
    val databaseName = "Licytacje"
    val databaseUrl = "jdbc:postgresql://localhost:5432/$databaseName"
    val databaseUser = "postgres"
    val databasePassword = "admin"

    try {
        // Spróbuj nawiązać połączenie z bazą danych
        Database.connect(
                url = databaseUrl,
                driver = "org.postgresql.Driver",
                user = databaseUser,
                password = databasePassword
        )

        transaction {
            SchemaUtils.createMissingTablesAndColumns(Auctions,
                    Bailiffs,
                    HistoricalPrices,
                    RealEstatePictures,
                    RealEstates,
                    UsersData)
        }

    } catch (e: Exception) {
        // Jeśli wystąpił błąd podczas połączenia lub transakcji, wyświetl komunikat o błędzie
        println("Błąd podczas łączenia z bazą danych: ${e.message}")
    }
    */

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
