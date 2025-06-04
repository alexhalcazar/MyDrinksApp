package com.alexhalcazar.mydrinksapp.model

import kotlinx.serialization.Serializable

@Serializable
data class Drink(
    val idDrink: String,
    val strDrink: String,
    val strTags: String?,
    val strCategory: String?,
    val strAlcoholic: String?,
    val strGlass: String?,
    val strDrinkThumb: String?
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Drink) return false
        return idDrink == other.idDrink
    }

    override fun hashCode(): Int {
        return idDrink.hashCode()
    }
}
