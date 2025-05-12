package com.alexhalcazar.mydrinksapp.model

import kotlinx.serialization.Serializable

@Serializable
data class CreatedDrink(
    val name: String,
    val alcohol: Ingredient,
    val ingredient1: Ingredient,
    val ingredient2: Ingredient?,
    val ingredient3: Ingredient?,
)

@Serializable
data class CustomDrink(
    val name: String,
    val alcohol: Ingredient,
    val ingredient1: Ingredient,
    val ingredient2: Ingredient?,
    val ingredient3: Ingredient?,
)