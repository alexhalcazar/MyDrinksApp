import { useState, useEffect } from "react";

function drinkCreator() {
    const [cocktail, setCocktail] = useState(null);

    const [ingredients, setIngredients] = useState([""]);
    const [drinkName, setDrinkName] = useState("");
    const [alcoholType, setAlcoholType] = useState("Vodka");

    const resetForm = () => {
        setDrinkName("");
        setAlcoholType("Vodka");
        setIngredients([""]);
    };

    const addIngredient = () => {
        if (ingredients.length >= 3) return;
        setIngredients([...ingredients, ""]);
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const drinkData = {
                    dateModified: new Date(),
                    idDrink: "99999",
                    strAlcoholic: "Alcoholic",
                    strCategory: "Other / Unknown",
                    strCreativeCommonsConfirmed: "No",
                    strDrink: drinkName,
                    strDrinkAlternate: null,
                    strDrinkThumb: null,
                    strGlass: null,
                    strIBA: null,
                    strImageAttribution: null,
                    strImageSource: null,
                    strIngredient1: ingredients[0],
                    strIngredient2: ingredients[1],
                    strIngredient3: ingredients[2],
                    strIngredient4: null,
                    strIngredient5: null,
                    strIngredient6: null,
                    strIngredient7: null,
                    strIngredient8: null,
                    strIngredient9: null,
                    strIngredient10: null,
                    strIngredient11: null,
                    strIngredient12: null,
                    strIngredient13: null,
                    strIngredient14: null,
                    strIngredient15: null,
                    strInstructions: null,
                    strInstructionsDE: null,
                    strInstructionsES: null,
                    strInstructionsFR: null,
                    strInstructionsIT: null,
                    "strInstructionsZH-HANS": null,
                    "strInstructions-HANT": null,
                    strMeasure1: null,
                    strMeasure2: null,
                    strMeasure3: null,
                    strMeasure4: null,
                    strMeasure5: null,
                    strMeasure6: null,
                    strMeasure7: null,
                    strMeasure8: null,
                    strMeasure9: null,
                    strMeasure10: null,
                    strMeasure11: null,
                    strMeasure12: null,
                    strMeasure13: null,
                    strMeasure14: null,
                    strMeasure15: null,
                    strTags: null,
                    strVideo: null
        };
        console.log(drinkData)
        console.log(JSON.stringify(drinkData))

        try {
            const response = await fetch('/api/drinks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(drinkData)
            });

            console.log(response);

            const result = await response.json();
            if (response.ok) {
                window.location.href = '/?created=true';
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
                console.log(error.message)
        } finally {
            resetForm();
        }
    };

    return (
        <div className="container">
            <h1>Create Your Drink</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Drink Name:
                        <input
                            type="text"
                            value={drinkName}
                            onChange={(e) => setDrinkName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Alcohol Type:
                        <select
                            value={alcoholType}
                            onChange={(e) => setAlcoholType(e.target.value)}
                            required
                        >
                            <option value="Whiskey">Whiskey</option>
                            <option value="Vodka">Vodka</option>
                            <option value="Rum">Rum</option>
                            <option value="Gin">Gin</option>
                            <option value="Tequila">Tequila</option>
                            <option value="Brandy">Brandy</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>Ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-group">
                            <select
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            >
                                <option value="">Select an ingredient</option>
                                <option value="Triple Sec">Triple Sec</option>
                                <option value="Sweet Vermouth">Sweet Vermouth</option>
                                <option value="Dry Vermouth">Dry Vermouth</option>
                                <option value="Lime juice">Lime juice</option>
                                <option value="Lemon juice">Lemon juice</option>
                                <option value="Mint">Mint</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Bitters">Bitters</option>
                                <option value="Grenadine">Grenadine</option>
                                <option value="Soda">Soda</option>
                            </select>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addIngredient}
                    disabled={ingredients.length >= 3}
                >
                    Add Ingredient (Max 3)
                </button>

                <button type="submit">Create Drink</button>

            </form>
            <a href="/">Back to Home</a>
        </div>
    );
}

export default drinkCreator;