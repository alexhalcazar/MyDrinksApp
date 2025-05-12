package com.alexhalcazar.mydrinksapp.model

import kotlinx.coroutines.flow.toList

suspend fun addDrink(drink: Drink): Boolean {
    val database = setupConnection()
    if (database == null) {
        return false
    }
    val collection = database.getCollection<Drink>("drinks")
    val drinks:List<Drink> = collection.find().toList()
    drinks.forEach { d ->
        if (drink == d) {
            return false
        }
    }
    collection.insertOne(drink)
    return true
}

// Function built for pulling drinks stored in the mongo db
// Will be called in My Drinks page

// Note: hey, setupConnection is bad practice, and we should switch to making
// our DB a global variable to grab from. Would could possibly implement
// a lazy function to it. I'm doing it for the time being, because I'm still testing.
suspend fun getMyDrinks(filter: String?): List<Drink> {
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