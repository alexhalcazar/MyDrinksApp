package com.alexhalcazar.mydrinksapp
import com.alexhalcazar.mydrinksapp.model.Drink
import com.alexhalcazar.mydrinksapp.routes.searchDrink
import com.alexhalcazar.mydrinksapp.model.addDrink
import io.ktor.server.plugins.cors.routing.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import java.io.File

import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.request.receive
import kotlinx.serialization.json.Json

fun main() {
    embeddedServer(Netty, port = 8080) {
        install(CORS) {
            anyHost()
            allowHeader(HttpHeaders.ContentType)
            allowMethod(HttpMethod.Get)
            allowMethod(HttpMethod.Post)
        }

        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
            })
        }

        routing {
            //get("/") {
            //    call.respondFile(File("src/main/resources/static/index.html"))
            //}
            //example: /search?name=margarita
            get("/search") {
                val name:String? = call.request.queryParameters["name"]
                if (name != null) {
                    searchDrink(call, name)
                } else {
                    call.respondText("PROVIDE DRINK NAME", status = io.ktor.http.HttpStatusCode.BadRequest)
                }
            }
            post("/save") {
                val drink = call.receive<Drink>()
                addDrink(drink)
                call.respond(HttpStatusCode.OK, "Drink added to My Drinks")
            }
            staticFiles("/", File("src/main/resources/static"))
        }
    }.start(wait = true)
}