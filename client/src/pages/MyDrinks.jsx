import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './MyDrinks.css';
import './shared.css'
import MyDrinkCard from '../components/MyDrinkCard';

const MyDrinks = () => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Calls my-drinks endpoint in Application.kt, to grab any saved
    // drinks in the database
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

    // Fetches the drinks when the component mounts
    useEffect(() => {
        fetchMyDrinks();
    }, []);

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

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className="my-drinks-container">
            <button onClick={goHome} className="home-button">Home</button>
            <h2>My Saved Drinks</h2>
            <div className="drink-list">
              {drinks.map((drink, index) => (
                <MyDrinkCard key={index} drink={drink} />
              ))}
            </div>
        </div>
    );
};

export default MyDrinks;
