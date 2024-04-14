package com.ztpai.dryad.model
import java.math.BigDecimal
import jakarta.persistence.*

@Entity
@Table(name = "Real_estate")
data class RealEstate(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "rel_id")
        var id: Int = 0,

        @Column(name = "rel_starting_price")
        var startingPrice: BigDecimal = BigDecimal.ZERO,

        @Column(name = "rel_estimated_price")
        var estimatedPrice: BigDecimal = BigDecimal.ZERO,

        @Column(name = "rel_land_and_mortgage_register_number")
        var landAndMortgageNumber: String = "",

        @Column(name = "rel_geoportal_number")
        var geoportalNumber: String = "",

        @Column(name = "rel_plot_size")
        var plotSize: String = "",

        @Column(name = "rel_descripcion")
        var sescription: String = "" ,

        @OneToOne(mappedBy = "RealEstate")
        var auction: Auction? = null


)