import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function drinkCreator() {
    const [ingredients, setIngredients] = useState([""]);
    const [drinkName, setDrinkName] = useState("");
    const [alcoholType, setAlcoholType] = useState("Vodka");
    const [saveStatus, setSaveStatus] = useState(null);
    const navigate = useNavigate();

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

    const goHome = () => {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientStr = ingredients
            .filter(ingredient => ingredient != null && ingredient !== '')
            .join(', ');

        const drinkData = {
                    idDrink: Date.now().toString(),
                    strAlcoholic: "Yes",
                    strCategory: alcoholType,
                    strDrink: drinkName,
                    strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/qyxrqw1439906528.jpg",
                    strGlass: null,
                    strIngredient1: ingredients[0],
                    strIngredient2: ingredients[1],
                    strIngredient3: ingredients[2],
                    strTags: ingredientStr
        };

        try {
            const response = await fetch('/api/drinks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(drinkData)
            });
            if (response.ok) {
                setSaveStatus({ success: true, message: "Drink saved to My Drinks!" });
            }
        } catch (error) {
            setSaveStatus({ success: false, message: "Error saving drink. Please try again." })
        } finally {
            resetForm();
        }
    };

    return (
        <div className="create-drink-container" align="center">
            <button onClick={goHome} className="home-button">Home</button>
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
                {saveStatus && (
                    <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
                        {saveStatus.message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default drinkCreator;