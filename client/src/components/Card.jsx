import { Link } from 'react-router-dom';

// made the cards interactive
const Card = ({ title, imgSrc, imgAlt, link }) => {
    const content = (
        <>
            <h2>{title}</h2>
            <hr />
            <div className="image-container">
                <img src={imgSrc} alt={imgAlt} />
            </div>
        </>
    );

    if (link) {
        return (
            <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card">
                    {content}
                </div>
            </Link>
        );
    } else {
        return (
            <div className="card">
                {content}
            </div>
        );
    }
};

export default Card;
