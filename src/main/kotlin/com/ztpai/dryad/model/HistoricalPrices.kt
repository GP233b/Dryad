package com.ztpai.dryad.model
import java.math.BigDecimal
import jakarta.persistence.*
import java.time.LocalDate


@Entity
@Table(name = "Historical_Prices")
data class HistoricalPrices(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "his_id")
        var id: Int = 0,

        @Column(name = "his_urd_id")
        var userID: Int? = null,

        @Column(name = "his_price")
        var userPrice: BigDecimal = BigDecimal.ZERO,

        @Column(name = "his_auc_id")
        var auctionId: Int? = null,

        @Column(name = "his_date")
        var dateOfOvershoot:  LocalDate = LocalDate.now(),

        @ManyToOne
        var auction: Auction? = null,

        @ManyToOne
        var userData: UserData? = null,

)
