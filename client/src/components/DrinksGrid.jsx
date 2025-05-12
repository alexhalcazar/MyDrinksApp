import { useEffect, useState } from 'react';
import Card from './Card.jsx';

const DrinksGrid = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const data = await res.json();
        setDrinks(data.drinks.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch drinks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (loading) return <div>Loading drinks...</div>;

  return (
    <div className="card-grid">
      {drinks.map(drink => (
        <Card
          key={drink.idDrink}
          title={drink.strDrink}
          imgSrc={drink.strDrinkThumb}
          imgAlt={drink.strDrink}
        />
      ))}
    </div>
  );
};

export default DrinksGrid;
