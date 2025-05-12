import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import SearchDrink from "./pages/SearchDrink.jsx";
import RandomCocktail from "./pages/RandomCocktail.jsx";
import Create from "./pages/Create.jsx"
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
                                    link="/create"
                                />
                                <Card
                                    title="My Drinks"
                                    imgSrc={createDrink}
                                    imgAlt="A drink"
                                />
                                <Link to="/search">
                                    <Card
                                        title="Search Drinks"
                                        imgSrc={createDrink}
                                        imgAlt="A drink"
                                    />
                                </Link>
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
                        <Route path="/create" element={<Create />} />
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
