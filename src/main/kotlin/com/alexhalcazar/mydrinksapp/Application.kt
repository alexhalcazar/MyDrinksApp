package com.alexhalcazar.mydrinksapp
import com.alexhalcazar.mydrinksapp.model.Drink
import com.alexhalcazar.mydrinksapp.routes.searchDrink
import com.alexhalcazar.mydrinksapp.model.addDrink
import io.ktor.server.plugins.cors.routing.*
import com.alexhalcazar.mydrinksapp.service.DrinksApiService
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import java.io.File
import io.ktor.server.request.receive
// Ktor Client Imports
import io.ktor.http.*
// Content Negotiation
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

fun main() {
    embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
                prettyPrint = true
            })
        }

        routing {
            //example: /search?name=margarita
            get("/api/drinks") {
                val name:String? = call.request.queryParameters["name"]
                if (name != null) {
                    searchDrink(call, name)
                } else {
                    call.respondText("PROVIDE DRINK NAME", status = io.ktor.http.HttpStatusCode.BadRequest)
                }
            }
            post("/api/drinks") {
                val drink = call.receive<Drink>()
                addDrink(drink)
                call.respond(HttpStatusCode.OK, "Drink added to My Drinks")
            }

            staticFiles("/", File("src/main/resources/static"))
            staticFiles("/assets", File("src/main/resources/static/assets"))

            get("/") {
                call.respondFile(File("src/main/resources/static/index.html"))
            }

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
