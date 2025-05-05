package com.alexhalcazar.mydrinksapp.routes


import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.http.*
import com.alexhalcazar.mydrinksapp.services.searchApiName

suspend fun searchDrink(call: ApplicationCall, name: String) {
    val drinks = searchApiName(name)
    if (drinks.drinks.isNullOrEmpty()) {
        call.respond(HttpStatusCode.NotFound, "Failed to find drinks for $name")
        return
    }
    call.respond(drinks.drinks)
    return
}






