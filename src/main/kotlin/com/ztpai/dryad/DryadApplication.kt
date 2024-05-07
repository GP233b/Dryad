import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

fun main(args: Array<String>) {
    val databaseName = "Licytacje"
    val databaseUrl = "jdbc:postgresql://localhost:5432/$databaseName"
    val databaseUser = "postgres"
    val databasePassword = "admin"

    try {
        Database.connect(
                url = databaseUrl,
                driver = "org.postgresql.Driver",
                user = databaseUser,
                password = databasePassword
        )
        transaction {
            val result = org.jetbrains.exposed.sql.transactions.TransactionManager.current().exec("SELECT * FROM Users_data")
            println("Rezultat zapytania:")
            println(result)
        }

        println("Połączono z bazą danych: $databaseName")
    } catch (e: Exception) {
        println("Błąd podczas łączenia z bazą danych: ${e.message}")
    }
}
