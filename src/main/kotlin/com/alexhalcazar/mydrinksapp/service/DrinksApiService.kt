package com.alexhalcazar.mydrinksapp.service

import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.engine.cio.*
import io.ktor.client.statement.*

object DrinksApiService {
    private val client = HttpClient(CIO)

    suspend fun fetchRandomCocktailJson(): String =
        client.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .bodyAsText()
}
