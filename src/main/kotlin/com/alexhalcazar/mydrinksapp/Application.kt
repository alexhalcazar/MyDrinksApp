package com.alexhalcazar.mydrinksapp

import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import java.io.File
import com.alexhalcazar.mydrinksapp.routes.searchDrink

fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/") {
                call.respondFile(File("src/main/resources/static/index.html"))
            }
            //example: /search?name=margarita
            get("/search") {
                val name:String? = call.request.queryParameters["name"]
                if (name != null) {
                    searchDrink(call, name)
                } else {
                    call.respondText("PROVIDE DRINK NAME", status = io.ktor.http.HttpStatusCode.BadRequest)
                }
            }
            staticFiles("/", File("src/main/resources/static"))

        }
    }.start(wait = true)
}