package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.DecimalColumnType

object RealEstates : IntIdTable() {
    val relStartingPrice: Column<java.math.BigDecimal> = decimal("rel_starting_price", 19, 2)
    val relEstimatedPrice: Column<java.math.BigDecimal> = decimal("rel_estimated_price", 19, 2)
    val relLandAndMortgageRegisterNumber = varchar("rel_land_and_mortgage_register_number",30)
    val relGeoportalNumber = varchar("rel_geoportal_number",255)
    val relDescription = text("rel_description")
}
