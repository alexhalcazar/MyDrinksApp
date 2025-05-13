import { useState, useEffect } from "react";

function drinkCreator() {
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

        const ingredientStr = ingredients
            .filter(ingredient => ingredient != null && ingredient !== '')
            .join(', ');

        const drinkData = {
                    dateModified: new Date(),
                    idDrink: "99999",
                    strAlcoholic: "Yes",
                    strCategory: alcoholType,
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
                    strTags: ingredientStr,
                    strVideo: null
        };

        try {
            const response = await fetch('/api/drinks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(drinkData)
            });

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
        <div className="create-drink-container" align="center">
            <h1>Create Your Drink</h1>

            <div className="card" >
                <form onSubmit={handleSubmit} className="drink-form">
                    <div className="form-group">
                        <label>
                            Drink Name:
                            <input
                                type="text"
                                value={drinkName}
                                onChange={(e) => setDrinkName(e.target.value)}
                                required
                                className="form-input"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Alcohol Type:
                            <select
                                value={alcoholType}
                                onChange={(e) => setAlcoholType(e.target.value)}
                                required
                                className="form-input"
                            >
                                <option value="Light rum">Light rum</option>
                                <option value="Bourbon">Bourbon</option>
                                <option value="Vodka">Vodka</option>
                                <option value="Gin">Gin</option>
                                <option value="Blended whiskey">Blended whiskey</option>
                                <option value="Tequila">Tequila</option>
                                <option value="Apricot Brandy">Apricot Brandy</option>
                                <option value="Southern Comfort">Southern Comfort</option>
                                <option value="Brandy">Brandy</option>
                                <option value="Lemon vodka">Lemon vodka</option>
                                <option value="Dark rum">Dark rum</option>
                                <option value="Scotch">Scotch</option>
                                <option value="Añejo rum">Añejo rum</option>
                                <option value="Kahlua">Kahlua</option>
                                <option value="Irish whiskey">Irish whiskey</option>
                                <option value="Apple brandy">Apple brandy</option>
                                <option value="Cherry brandy">Cherry brandy</option>
                                <option value="Coffee brandy">Coffee brandy</option>
                                <option value="Rum">Rum</option>
                                <option value="Cognac">Cognac</option>
                                <option value="Whiskey">Whiskey</option>

                            </select>
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="ingredients-label">Ingredients:</label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-group">
                                <select
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select an ingredient</option>
                                    <option value="Sweet Vermouth">Sweet Vermouth</option>
                                    <option value="Triple Sec">Triple Sec</option>
                                    <option value="Orange bitters">Orange bitters</option>
                                    <option value="Dry Vermouth">Dry Vermouth</option>
                                    <option value="Ameretto">Ameretto</option>
                                    <option value="Tea">Tea</option>
                                    <option value="Applejack">Applejack</option>
                                    <option value="Champagne">Champagne</option>
                                    <option value="Coffee liqueur">Coffee liqueur</option>
                                    <option value="Bitters">Bitters</option>
                                    <option value="Sugar">Sugar</option>
                                    <option value="Dubonnet Rouge">Dubonnet Rouge</option>
                                    <option value="Lime juice">Lime juice</option>
                                    <option value="Carbonated water">Carbonated water</option>
                                    <option value="Creme de Cacao">Creme de Cacao</option>
                                    <option value="Grenadine">Grenadine</option>
                                    <option value="Port">Port</option>
                                    <option value="Red Wine">Red Wine</option>
                                    <option value="Grapefruit juice">Grapefruit juice</option>
                                    <option value="Ricard">Ricard</option>
                                    <option value="Sherry">Sherry</option>
                                    <option value="Lemon juice">Lemon juice</option>
                                    <option value="Sugar syrup">Sugar syrup</option>
                                    <option value="7-Up">7-Up</option>
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            onClick={addIngredient}
                            disabled={ingredients.length >= 3}
                            className="secondary-button"
                        >
                            Add Ingredient (Max 3)
                        </button>

                        <button type="submit" className="primary-button">
                            Create Drink
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default drinkCreator;