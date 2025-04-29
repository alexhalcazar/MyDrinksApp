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

suspend fun searchDrink(call: ApplicationCall, name: String) {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
            })
        }
    }
    val cocktailURL:String = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=$name"
    val response: HttpResponse = client.get(cocktailURL)
    val drinks = response.body<DrinkResponse>()
    println(drinks.drinks.toString())
    call.respond(drinks.drinks.toString())
    return
}

@Serializable
data class DrinkResponse(
    val drinks: List<Drink>
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
