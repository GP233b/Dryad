package com.ztpai.dryad

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DryadApplication

fun main(args: Array<String>) {
    runApplication<DryadApplication>(*args)
}
