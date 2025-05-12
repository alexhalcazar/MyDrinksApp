package com.alexhalcazar.mydrinksapp.services

import com.alexhalcazar.mydrinksapp.model.DrinkResponse
import com.alexhalcazar.mydrinksapp.model.Ingredient
import com.alexhalcazar.mydrinksapp.model.IngredientListResponse
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.client.request.parameter
import io.ktor.client.statement.*
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.JsonArray
import kotlin.reflect.typeOf

suspend fun searchApiName(name: String): DrinkResponse {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
            })
        }
    }
    val cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?"
    val response: HttpResponse = client.get(cocktailURL) { parameter("s", name) }
    val drinks = response.body<DrinkResponse>()
    return drinks
}

object IngredientCache {
    var ingredientsList: List<Ingredient> = emptyList()
}

suspend fun fetchAndCacheAllIngredients() {
    val client = HttpClient(CIO)

    val ingredientURL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    try {
        val responseText = client.get(ingredientURL)
        println(responseText::class.simpleName)
        println("DEBUG: Raw JSON:\n$responseText")  // Add this line

//        val responseArray: JsonArray = responseText[0]?.jsonArray ?: JsonArray(emptyList())
//        val ingredientList = Json { ignoreUnknownKeys = true }.decodeFromString<IngredientListResponse>(responseText)
//        println(ingredientList)
//
//        IngredientCache.ingredientsList = ingredientList.ingredients
//        println("Successfully cached ${ingredientList.ingredients.size} ingredients.")
    } catch (e: Exception) {
        println("Error fetching ingredients: ${e.localizedMessage}")
    } finally {
        client.close()
    }
}
