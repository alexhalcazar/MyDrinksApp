package com.alexhalcazar.mydrinksapp.model


suspend fun addDrink(drink: Drink) {
    val database = setupConnection()
    if (database == null) {
        return
    }
    val collection = database.getCollection<Drink>("drinks")
    collection.insertOne(drink)
}