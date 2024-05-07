package com.ztpai.dryad.entities

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.kotlin.datetime.datetime
import java.math.BigDecimal

object HistoricalPrices: IntIdTable() {
    val hisUrdId = reference("his_urd_id",UsersData)
    val hisPrice: Column<BigDecimal> = decimal("his_price", 19, 2)
    val hisAucId = reference("auc_id", Auctions)
    val hisDate = datetime("his_date")


}