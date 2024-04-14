package com.ztpai.dryad.model
import java.math.BigDecimal
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "Auctions")
data class Auction(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "auc_id")
        var id: Int = 0,

        @Column(name = "auc_bai_id")
        var bailiffId:Int? = null,

        @Column(name = "auc_winning_price")
        var winningPrice: BigDecimal = BigDecimal.ZERO,

        @Column(name = "auc_winner_id")
        var winnerID: Int? = null,

        @Column(name = "auc_end_date")
        var endDate: LocalDate = LocalDate.now(),

        @Column(name = "BAI_office_location")
        var officeLocation: String = "",

        @Column(name = "auc_rel_id")
        var realEstateId :Int? = null,

        @ManyToOne
        var bailiff: Bailiff? = null,

        @OneToOne
        var realEstate: RealEstate? = null,

        @ManyToOne
        var userData: UserData? = null,

        @OneToMany (mappedBy = "Auctions")
        @JoinColumn (name = "auc_id")
        var realEstatePictures: MutableList<RealEstatePictures> = mutableListOf(),

        @OneToMany (mappedBy = "Auctions")
        @JoinColumn (name = "auc_id")
        var historicalPrices: MutableList<HistoricalPrices> = mutableListOf()
)