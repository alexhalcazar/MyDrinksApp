package com.alexhalcazar.mydrinksapp.routes

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import kotlinx.serialization.json.Json
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.http.*
import kotlinx.serialization.Serializable
import com.alexhalcazar.mydrinksapp.model.setupConnection

suspend fun searchDrink(call: ApplicationCall, name: String) {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
            })
        }
    }
    val cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?"
    val response: HttpResponse = client.get(cocktailURL) {parameter("s", name)}
    val drinks = response.body<DrinkResponse>()
    if (drinks.drinks.isNullOrEmpty()) {
        call.respond(HttpStatusCode.NotFound, "Failed to find drinks for $name")
        return
    }
    call.respond(drinks.drinks.toString())
    return
}

suspend fun addDrink(drink: Drink) {
    val database = setupConnection()
    if (database == null) {
        return
    }
    val collection = database.getCollection<Drink>("drinks")
    collection.insertOne(drink)
}

@Serializable
data class DrinkResponse(
    val drinks: List<Drink>?
)

@Serializable
data class Drink(
    val idDrink: String,
    val strDrink: String,
    val strTags: String?,
    val strCategory: String?,
    val strAlcoholic: String?,
    val strGlass: String?,
    val strImageSource: String?
)
