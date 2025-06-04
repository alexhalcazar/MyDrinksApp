package com.alexhalcazar.mydrinksapp.model

import com.mongodb.MongoWriteException
import kotlinx.coroutines.flow.toList

suspend fun addDrink(drink: Drink): Boolean {
    val database = setupConnection()
    if (database == null) {
        return false
    }
    val collection = database.getCollection<Drink>("drinks")
    return try {
        collection.insertOne(drink)
        true
    } catch (e: MongoWriteException) {
        println("MongoWriteException code: ${e.error.code}, message: ${e.error.message}")
        false
    }
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