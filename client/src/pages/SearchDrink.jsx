import { useState } from 'react';
import './SearchDrink.css';
import './shared.css'
import DrinksGrid from '../components/SearchDrinkCard';
import { useNavigate } from "react-router-dom";

async function retrieveDrinks(name) {
    const response = await fetch(`/api/drinks?name=${encodeURIComponent(name)}`,{
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Failed to retrieve drinks");
    }
    const data = await response.json();
    return data;
}

function SearchDrink() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const drinks = await retrieveDrinks(query);
            setResults(drinks);
        } catch (e) {
            console.error(e)
        }
    };

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className="app-container">
            <div className="main-content">
                <button onClick={goHome} className="home-button">Home</button>
                <div className="search">
                    <input className="search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Cocktails" />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
                <DrinksGrid drinks={results}/>
            </div>
        </div>
    );
};

export default SearchDrink;