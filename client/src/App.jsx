import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Card from './components/Card.jsx'
import './App.css'
// import createDrinkImg from '../public/createDrink.jpg';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="app-header">
                    My Drinks App
                </header>
                <hr />
                <div className="main-content">
                    <div className="card-grid">
                        <Card
                            title="Create Drink"
                            imgSrc="./public/createDrink.jpg"
                            imgAlt="A drink"
                        />
                        <Card
                            title="My Drinks"
                            imgSrc="./public/createDrink.jpg"
                            imgAlt="A drink"
                        />
                        <Card
                            title="Search Drinks"
                            imgSrc="./public/createDrink.jpg"
                            imgAlt="A drink"
                        />
                        <Card
                            title="Random Drink"
                            imgSrc="./public/createDrink.jpg"
                            imgAlt="A drink"
                        />
                    </div>
                </div>
                <footer>
                    Footer Content
                </footer>
            </div>
        </BrowserRouter>
    );
};
export default App
