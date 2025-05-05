package com.alexhalcazar.mydrinksapp.model

import com.alexhalcazar.mydrinksapp.model.Drink
import kotlinx.serialization.Serializable

@Serializable
data class DrinkResponse(
    val drinks: List<Drink>?
)