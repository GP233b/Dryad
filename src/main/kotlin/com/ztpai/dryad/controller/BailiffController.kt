package com.ztpai.dryad.controller

import com.ztpai.dryad.entities.Bailiff
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/bailiffs")
class BailiffController {
    data class BailiffDTO(
            val id: Int,
            val baiName: String,
            val baiSurname: String,
            val baiPhoneNumber: Int,
            val baiOfficeLocation: String
    )

    @GetMapping
    fun getAllBailiffs(): ResponseEntity<List<BailiffDTO>> {
        val bailiffs = transaction {
            Bailiff.all().map { bailiff ->
                BailiffDTO(
                        id = bailiff.id.value,
                        baiName = bailiff.baiName,
                        baiSurname = bailiff.baiSurname,
                        baiPhoneNumber = bailiff.baiPhoneNumber,
                        baiOfficeLocation = bailiff.baiOfficeLocation
                )
            }
        }

        return ResponseEntity.ok(bailiffs)
    }
}
