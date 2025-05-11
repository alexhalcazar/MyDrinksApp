package com.alexhalcazar.mydrinksapp.model



fun filterDrinks(drinks: List<Drink>, element: (Drink) -> Boolean): List<Drink> {
    return drinks.filter(element)
}

fun getElementByType(type: String): (Drink) -> Boolean {
    return when (type) {
        "all" -> { _ -> true}
        "Alcoholic" -> { drink -> drink.strAlcoholic == "Alcoholic" }
        "Non alcoholic" -> { drink -> drink.strAlcoholic == "Non alcoholic"}
        else -> { _ -> true }
    }
}