package com.ztpai.dryad.entities


import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object Auctions: IntIdTable() {
    val aucName = varchar("auc_name", 255).default("default_name")
    val aucBaiId = reference("auc_bai_id",Bailiffs)
    val aucWinningPrice: Column<java.math.BigDecimal> = decimal("auc_winning_price", 19, 2)
    val aucWinnerId = reference("auc_winner_id", UsersData)
    val aucEndDate = datetime("auc_end_date")
    val aucRelId = reference("auc_rel_id",RealEstates)
}
