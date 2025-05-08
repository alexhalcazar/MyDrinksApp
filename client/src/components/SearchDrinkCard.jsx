import React from "react";
import "./SearchDrinkCard.css"

function SearchDrinkCard({ drink }) {
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
            alert("Drink added to My Drinks"); 
        } catch (error) {
            alert(error, "Error adding drink to My Drinks");
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