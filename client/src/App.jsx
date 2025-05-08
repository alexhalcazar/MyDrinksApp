import { BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchDrink from "./pages/SearchDrink.jsx";
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
