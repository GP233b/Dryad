package com.ztpai.dryad.model
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "Users_data")
data class UserData(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "urd_id")
        var id: Int = 0,

        @Column(name = "urd_name")
        var name: String = "",

        @Column(name = "urd_surname")
        var surname: String = "",

        @Column(name = "urd_date_of_birth")
        var dateOfBirth: LocalDate = LocalDate.now(),

        @OneToMany (mappedBy = "Users_data")
        @JoinColumn (name = "urd_id")
        var auctions: MutableList<Auction> = mutableListOf(),

        @OneToMany (mappedBy = "Users_data")
        @JoinColumn (name = "urd_id")
        var historicalPrices: MutableList<HistoricalPrices> = mutableListOf()

)