const Card = ({ title, imgSrc, imgAlt }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <hr />
            <div className="image-container">
                <img src={imgSrc} alt={imgAlt} />
            </div>
        </div>
    );
}

export default Card;
