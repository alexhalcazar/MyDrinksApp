package com.alexhalcazar.mydrinksapp
import com.alexhalcazar.mydrinksapp.model.Drink
import com.alexhalcazar.mydrinksapp.routes.searchDrink
import com.alexhalcazar.mydrinksapp.model.addDrink
import com.alexhalcazar.mydrinksapp.model.getMyDrinks
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
            // serve static files from the root path
            staticFiles("/", File("src/main/resources/static"))
            // serve static assets
            staticFiles("/assets", File("src/main/resources/static/assets"))
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

            // returns drink list to the front-end, input at `MyDrinks.jsx`
            get("/api/my-drinks") {
                try {
                    val filter = call.request.queryParameters["filter"]
                    val drinks = getMyDrinks(filter)
                    call.respond(drinks)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error fetching drinks: ${e.message}")
                }
            }

            get("/api/random-drink") {
                try {
                    val cocktailJson = DrinksApiService.fetchRandomCocktailJson()
                    call.respondText(cocktailJson, ContentType.Application.Json)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error fetching cocktail data: ${e.message}")
                }
            }

            get("/") {
                call.respondFile(File("src/main/resources/static/index.html"))
            }
        }
    }.start(wait = true)
}
