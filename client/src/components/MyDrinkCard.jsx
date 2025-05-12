import './MyDrinkCard.css';
import temp from '../assets/createDrink.jpg'

const MyDrinkCard = ({ drink }) => {
    return (
        <div className="drink-card">
            <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="drink-thumbnail"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = temp;
            }}
            />
            <div className="drink-details">
                <h3>{drink.name}</h3>
                <p><strong>Category:</strong> {drink.strCategory}</p>
                <p><strong>Type:</strong> {drink.strAlcoholic}</p>
                <p><strong>Glass:</strong> {drink.strGlass}</p>
            </div>
        </div>
    );
};

export default MyDrinkCard;
