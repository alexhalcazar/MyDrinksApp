package com.alexhalcazar.mydrinksapp

import com.alexhalcazar.mydrinksapp.service.DrinksApiService

import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import java.io.File


// Ktor Client Imports
/*import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.engine.cio.*
import io.ktor.client.statement.**/
import io.ktor.http.*

// Content Negotiation
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
/*import kotlinx.serialization.Serializable*/
import kotlinx.serialization.json.Json


fun main() {
    embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) {
            json(Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true
            })
        }

        routing {
            // Static files and root route
            get("/") {
                call.respondFile(File("src/main/resources/static/index.html"))
            }
            staticFiles("/", File("src/main/resources/static"))

            // Proxy route for the frontend
            get("/api/random-drink") {
                try {
                    val cocktailJson = DrinksApiService.fetchRandomCocktailJson()
                    call.respondText(cocktailJson, ContentType.Application.Json)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error fetching cocktail data: ${e.message}")
                }
            }
        }
    }.start(wait = true)
}
