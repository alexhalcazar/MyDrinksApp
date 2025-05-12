package com.alexhalcazar.mydrinksapp.model

import kotlinx.serialization.Serializable

@Serializable
data class IngredientListResponse (
    val ingredients: List<Ingredient>
)