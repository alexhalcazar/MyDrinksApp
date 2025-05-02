package com.alexhalcazar.mydrinksapp

import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import java.io.File

/// THESE imports below are mine and can be changed do not remove team memebers above
// Ktor Client Imports
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.engine.cio.*
import io.ktor.client.statement.*
import io.ktor.http.*

// Content Negotiation
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

// Data model for the cocktail response
@Serializable
data class CocktailResponse(
    val drinks: List<Cocktail>
)

@Serializable
data class Cocktail(
    val strDrink: String,
    val strDrinkThumb: String,
    val strInstructions: String,
    val strIngredient1: String?,
    val strIngredient2: String?,
    val strIngredient3: String?,
    val strIngredient4: String?,
    val strIngredient5: String?,
    val strIngredient6: String?,
    val strIngredient7: String?,
    val strIngredient8: String?,
    val strIngredient9: String?,
    val strIngredient10: String?,
    val strIngredient11: String?,
    val strIngredient12: String?,
    val strIngredient13: String?,
    val strIngredient14: String?,
    val strIngredient15: String?,
    val strMeasure1: String?,
    val strMeasure2: String?,
    val strMeasure3: String?,
    val strMeasure4: String?,
    val strMeasure5: String?,
    val strMeasure6: String?,
    val strMeasure7: String?,
    val strMeasure8: String?,
    val strMeasure9: String?,
    val strMeasure10: String?,
    val strMeasure11: String?,
    val strMeasure12: String?,
    val strMeasure13: String?,
    val strMeasure14: String?,
    val strMeasure15: String?
)

fun main() {
    embeddedServer(Netty, port = 8080) {
        // Install the ContentNegotiation feature with JSON support
        install(ContentNegotiation) {
            json(Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true // Important when parsing external APIs
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
                    val cocktailJson = fetchRandomCocktail()
                    call.respondText(cocktailJson, ContentType.Application.Json)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error fetching cocktail data: ${e.message}")
                }
            }
        }
    }.start(wait = true)
}

// Ktor HTTP client to fetch the cocktail data
suspend fun fetchRandomCocktail(): String {
    val client = HttpClient(CIO)

    try {
        val response: HttpResponse = client.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        return response.bodyAsText() // Return the raw JSON string
    } catch (e: Exception) {
        throw Exception("Error fetching cocktail data: ${e.message}")
    } finally {
        client.close()
    }
}
