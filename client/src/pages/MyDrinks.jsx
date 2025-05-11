import { useEffect, useState } from 'react';
import './MyDrinks.css';
import MyDrinkCard from '../components/MyDrinkCard';

const MyDrinks = () => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all')

    // Calls my-drinks endpoint in Application.kt, to grab any saved
    // drinks in the database
    const fetchMyDrinks = async () => {
        setLoading(true);
        setError(null);

        try {
            const filter = `?filter=${encodeURIComponent(filterType)}`;
            const response = await fetch(`/api/my-drinks${filter}`);

            if (!response.ok) {
                throw new Error('Failed to fetch your saved drinks');
            }

            const data = await response.json();
            setDrinks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetches the drinks when the component mounts
    useEffect(() => {
        fetchMyDrinks();
    }, [filterType]);

    // Handle Filter Change
    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    // Temp loading feature
    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    // Error handling
    if (error) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
                <button onClick={fetchMyDrinks} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    // Empty List handling
    if (!drinks.length) {
        return (
            <div className="not-found-container">
                <p>No saved drinks found.</p>
                <button onClick={fetchMyDrinks} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="my-drinks-container">
            <h2>My Saved Drinks</h2>
            <label htmlFor="filter">Filter by type: </label>
            <select id="filter" value={filterType} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="Alcoholic">Alcoholic</option>
                <option value="Non alcoholic">Non alcoholic</option>
                <option value="None">None</option>
            </select>
            <div className="drink-list">
              {drinks.map((drink, index) => (
                <MyDrinkCard key={index} drink={drink} />
              ))}
            </div>
        </div>
    );
};

export default MyDrinks;
