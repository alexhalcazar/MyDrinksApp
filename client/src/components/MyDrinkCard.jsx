import './MyDrinkCard.css';

function MyDrinkCard({ drink }) {
    return (
        <div className="drink-card">
            <img src={drink.image} alt={drink.name} />
            <div className="drink-details">
                <h3>{drink.name}</h3>
                <p className="drink-tags">Tags: {drink.tags?.join(', ') || 'None'}</p>
            </div>
        </div>
    );
}

export default MyDrinkCard;
