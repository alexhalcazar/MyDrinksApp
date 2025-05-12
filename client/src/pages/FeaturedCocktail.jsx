import { useEffect, useState } from 'react';
import './FeaturedCocktail.css';

const FeaturedCocktail = () => {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirstDrink = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const data = await response.json();
        if (data.drinks && data.drinks.length > 0) {
          setDrink(data.drinks[0]); // the first one alphabetically
        }
      } catch (error) {
        console.error('Error fetching first drink:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstDrink();
  }, []);

  if (loading) return <div>Loading featured drink...</div>;
  if (!drink) return <div>No featured drink available.</div>;

  return (
    <div className="featured-drink-card">
      <img src={drink.strDrinkThumb} alt={drink.strDrink} className="cocktail-image" />
      <h3>{drink.strDrink}</h3>
    </div>
  );
};

export default FeaturedCocktail;
