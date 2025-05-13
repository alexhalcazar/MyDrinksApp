import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './RandomCocktail.css';
import './shared.css'

const RandomCocktail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const navigate = useNavigate();

  const fetchRandomCocktail = async () => {
      setLoading(true);
      setError(null);
      setSaveStatus(null);

      try {
        const response = await fetch('/api/random-drink');

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.drinks || data.drinks.length === 0) {
          throw new Error('No cocktail data returned from API');
        }

        setCocktail(data.drinks[0]);
      } catch (error) {
        console.error('Error fetching random cocktail:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const saveDrink = async () => {
      if (!cocktail) return;

      try {
        const response = await fetch("/api/drinks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cocktail),
        });

        if (!response.ok) {
          throw new Error("Failed to add drink to My Drinks");
        }

        setSaveStatus({ success: true, message: "Drink saved to My Drinks!" });
      } catch (error) {
        console.error('Error saving drink:', error);
        setSaveStatus({ success: false, message: "Error saving drink. Please try again." });
      }
    };

    useEffect(() => {
      fetchRandomCocktail();
    }, []);

    if (loading) {
      return <div className="loading-container">Loading...</div>;
    }

    if (error) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={fetchRandomCocktail} className="retry-button">
            Try Again
          </button>
        </div>
      );
    }

    if (!cocktail) {
      return (
        <div className="not-found-container">
          <p>No cocktail found.</p>
          <button onClick={fetchRandomCocktail} className="retry-button">
            Try Again
          </button>
        </div>
      );
    }

    // Helper function to get all valid ingredients and measures
    const getIngredients = () => {
      const ingredients = [];

      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
          ingredients.push({
            ingredient,
            measure: measure || ''
          });
        }
      }

      return ingredients;
    };

    const ingredients = getIngredients();
    const goHome = () => {
      navigate("/");
    }
    return (
      <div className="random-cocktail-container">
        <button onClick={goHome} className="home-button">Home</button>
        <h2>{cocktail.strDrink}</h2>

        <div className="card">
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            className="cocktail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/400x400?text=No+Image';
            }}
          />

          <div className="ingredients-container">
            <h3>Ingredients:</h3>
            {ingredients.length > 0 ? (
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>
                    {item.measure && `${item.measure.trim()} `}
                    {item.ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients information available</p>
            )}
          </div>
        </div>

        <div className="instructions-container">
          <h3>Instructions:</h3>
          <p>{cocktail.strInstructions || 'No instructions available'}</p>
        </div>

        <div className="action-buttons">
          <button onClick={fetchRandomCocktail} className="random-drink-button">
            Get Another Random Drink
          </button>
          <button onClick={saveDrink} className="save-button">
            Save This Drink
          </button>
        </div>

        {saveStatus && (
          <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
            {saveStatus.message}
          </div>
        )}
      </div>
    );
  };

  export default RandomCocktail;
