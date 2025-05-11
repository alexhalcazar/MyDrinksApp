import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchDrink from "./pages/SearchDrink.jsx";
import MyDrinks from "./pages/MyDrinks.jsx";
import RandomCocktail from "./pages/RandomCocktail.jsx";
import Card from './components/Card.jsx'
import './App.css'
import createDrink from './assets/createDrink.jpg';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="app-header">
                    My Drinks App
                </header>
                <hr />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <div className="card-grid">
                                <Card
                                    title="Create Drink"
                                    imgSrc={createDrink}
                                    imgAlt="A drink"
                                />
                                <Card
                                    title="My Drinks"
                                    imgSrc={createDrink}
                                    imgAlt="A drink"
                                    link="/list"
                                />
                                <Card
                                    title="Search Drinks"
                                    imgSrc={createDrink}
                                    imgAlt="A drink"
                                    link="/search"
                                />
                                <Card
                                    title="Random Drink"
                                    imgSrc={createDrink}
                                    imgAlt="A drink"
                                    link="/random"
                                />
                            </div>
                        } />
                        <Route path="/search" element={<SearchDrink />} />
                        <Route path="/random" element={<RandomCocktail />} />
                        <Route path="/list" element={<MyDrinks />} />
                    </Routes>
                </div>
                <footer>
                    Footer Content
                </footer>
            </div>
        </BrowserRouter>
    );
};
export default App
