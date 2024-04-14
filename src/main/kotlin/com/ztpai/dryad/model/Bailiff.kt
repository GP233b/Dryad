package com.ztpai.dryad.model

import jakarta.persistence.*

@Entity
@Table(name = "Bailiff")
data class Bailiff(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "bai_id")
        var id: Int = 0,

        @Column(name = "bai_name")
        var name: String = "",

        @Column(name = "bai_surname")
        var surname: String = "",

        @Column(name = "bai_phone_number")
        var phoneNumber: Int = 0,

        @Column(name = "BAI_office_location")
        var officeLocation: String = "",



        @OneToMany (mappedBy = "Bailiff")
        @JoinColumn (name = "bai_id")
        var auctions: MutableList<Auction> = mutableListOf()





)