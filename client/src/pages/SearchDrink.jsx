import { useState } from 'react';
import './SearchDrink.css';
import DrinksGrid from '../components/SearchDrinkCard';

async function retrieveDrinks(name) {
    const response = await fetch(`http://localhost:8080/search?name=${encodeURIComponent(name)}`,{
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

    const handleSearch = async () => {
        try {
            const drinks = await retrieveDrinks(query);
            setResults(drinks);
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="app-container">
            <div className="main-content">
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