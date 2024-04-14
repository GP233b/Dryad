package com.ztpai.dryad.model
import jakarta.persistence.*



@Entity
@Table(name = "Real_estate_pictures")
data class RealEstatePictures(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "rep_id")
        var id: Int = 0,
        @Column(name = "rep_auc_id")
        var auctionId: Int? = null,

        @Lob
        @Column(name = "auc_picture", columnDefinition = "bytea")
        var picture: ByteArray? = null,

        @ManyToOne
        var auction: Auction? = null

)