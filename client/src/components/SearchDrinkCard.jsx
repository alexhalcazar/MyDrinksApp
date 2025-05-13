import {useState, React} from "react";
import "./SearchDrinkCard.css"

function SearchDrinkCard({ drink }) {
    const [saveStatus, setSaveStatus] = useState(null);

    const SaveDrink = async () => {
        try {
            const response = await fetch("/api/drinks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(drink),
            });
            
            if (!response.ok) {
                throw new Error("Failed to add drink to My Drinks");
            }
            setSaveStatus({ success: true, message: "Drink saved to My Drinks!" });
        } catch (error) {
            console.error('Error saving drink:', error);
            setSaveStatus({ success: false, message: "Error adding Drink, might already be saved" });
        }
    };

    return (
        <div className="drink-card">
            {drink.strDrinkThumb && (<img className="drink-image"src={drink.strDrinkThumb}alt={drink.strDrink}/>)}
            <div className="drink-details">
            <h2 className="drink-name">{drink.strDrink}</h2>
            <p className="drink-cat">
                {drink.strCategory} | {drink.strAlcoholic}
            </p>
            {drink.strTags && <p className="drink-tags">Tags: {drink.strTags}</p>}
            <p className="drink-glass">Served in: {drink.strGlass}</p>
            <button className="save-button" onClick={SaveDrink}>Save Drink</button>
            {saveStatus && (
                <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
                {saveStatus.message}
                </div>
            )}
            </div>
        </div>
    );
}

function DrinksGrid({ drinks }) {
    return (
        <div className="drinks-grid">
            {drinks.map(drink => (
                    <SearchDrinkCard key={drink.idDrink} drink={drink} />
            ))}
        </div>
    );
}

export default DrinksGrid;