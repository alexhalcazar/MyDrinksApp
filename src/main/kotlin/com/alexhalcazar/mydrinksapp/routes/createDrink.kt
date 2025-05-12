package com.alexhalcazar.mydrinksapp.routes

import com.alexhalcazar.mydrinksapp.model.CustomDrink
import com.alexhalcazar.mydrinksapp.model.Ingredient
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.createDrink() {

    get("/api/create") {
//        call.respondFile(File("client/create.html"))
    }

    post("/api/create") {
        try {
            val name = call.parameters["name"]
            val alcohol = call.receive<Ingredient>()
            val ingredient1 = call.receive<Ingredient>()
            val ingredient2 = call.receive<Ingredient>()
            val ingredient3 = call.receive<Ingredient>()

            val createdDrink = CustomDrink(name.toString(), alcohol, ingredient1, ingredient2, ingredient3)

            call.respond(HttpStatusCode.Created, mapOf("message" to "Drink created!"))

        } catch (e: Exception) {
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid drink data"))
        }
    }
}