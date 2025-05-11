package com.alexhalcazar.mydrinksapp.model

import kotlinx.coroutines.flow.toList


suspend fun addDrink(drink: Drink) {
    val database = setupConnection()
    if (database == null) {
        return
    }
    val collection = database.getCollection<Drink>("drinks")
    collection.insertOne(drink)
}

// Function built for pulling drinks stored in the mongo db
// Will be called in My Drinks page

// Note: hey, setupConnection is bad practice, and we should switch to making
// our DB a global variable to grab from. Would could possibly implement
// a lazy function to it. I'm doing it for the time being, because I'm still testing.
suspend fun getMyDrinks(filter: String?): List<Drink> {
    println(filter)
    if (filter == null) {
        return emptyList()
    }
    val database = setupConnection()
    if (database == null) {
        return emptyList()
    }

    val collection = database.getCollection<Drink>("drinks")
    return filterDrinks(collection.find().toList(), getElementByType(filter))
}