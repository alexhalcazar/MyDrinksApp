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
)