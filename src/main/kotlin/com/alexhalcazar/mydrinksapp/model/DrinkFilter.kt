package com.alexhalcazar.mydrinksapp.model



fun filterDrinks(drinks: List<Drink>, element: (Drink) -> Boolean): List<Drink> {
    return drinks.filter(element)
}

val typeFilterMap: Map<String, (Drink) -> Boolean> = mapOf(
    "all" to { _ -> true},
    "Alcoholic" to { drink -> drink.strAlcoholic == "Alcoholic" },
    "Non alcoholic" to { drink -> drink.strAlcoholic == "Non alcoholic"}
)

fun getElementByType(type: String): (Drink) -> Boolean {
    return typeFilterMap[type] ?: { _ -> true }
}