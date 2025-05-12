import { useState } from "react";

function DrinkCreator() {
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
            name: drinkName,
            alcoholType: alcoholType,
            ingredients: ingredients.filter(ing => ing !== "") // Filter out empty selections
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

export default DrinkCreator;