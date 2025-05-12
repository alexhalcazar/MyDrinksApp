import { useState, useEffect } from 'react';
import './RandomCocktail.css';

const RandomCocktail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomCocktail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/random-drink');

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

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

    return (
      <div className="random-cocktail-container">
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

        <button onClick={fetchRandomCocktail} className="random-drink-button">
          Get Another Random Drink
        </button>
      </div>
    );
  };

  export default RandomCocktail;
