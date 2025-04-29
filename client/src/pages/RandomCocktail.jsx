import { useState, useEffect } from 'react';
import './RandomCocktail.css';

const RandomCocktail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomCocktail = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setCocktail(data.drinks[0]);
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cocktail) {
    return <div>No cocktail found.</div>;
  }

  return (
    <div className="random-cocktail-container">
      <h2>{cocktail.strDrink}</h2>

      <div className="card">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />

        <div className="ingredients-container">
          <h3>Ingredients:</h3>
          <ul>
            {Array.from({ length: 15 }, (_, index) => {
              const ingredient = cocktail[`strIngredient${index + 1}`];
              const measure = cocktail[`strMeasure${index + 1}`];
              return ingredient ? (
                <li key={index}>
                  {measure ? `${measure} ` : ''}{ingredient}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>

      <div className="instructions-container">
        <h3>Instructions:</h3>
        <p>{cocktail.strInstructions}</p>
      </div>

      <button onClick={fetchRandomCocktail} className="random-drink-button">
        Get Another Random Drink
      </button>
    </div>
  );
};

export default RandomCocktail;
