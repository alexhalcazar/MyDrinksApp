import { useEffect, useState } from 'react';
import './MyDrinks.css';
import MyDrinkCard from '../components/MyDrinkCard';

const MyDrinks = () => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyDrinks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/my-drinks');

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

    // Fetch the drinks when the component mounts
    useEffect(() => {
        fetchMyDrinks();
    }, []);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

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
            <div className="drinks-list">
                {drinks.map((drink, index) => (
                    <MyDrinkCard key={index} drink={drink} />
                ))}
            </div>
        </div>
    );
};

export default MyDrinks;
