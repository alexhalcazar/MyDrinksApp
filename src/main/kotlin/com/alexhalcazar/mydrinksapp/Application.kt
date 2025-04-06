package com.alexhalcazar.mydrinksapp

import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import java.io.File

fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/") {
                call.respondFile(File("src/main/resources/static/index.html"))
            }
            staticFiles("/static", File("src/main/resources/static"))

        }
    }.start(wait = true)
}