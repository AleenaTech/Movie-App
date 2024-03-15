import React from "react";
import { Link } from "react-router-dom";

const MoviePage: React.FC = () => {
    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <h1>Welcome to our Movie App</h1>
                <p>Discover, explore, and enjoy your favorite movies.</p>
                <Link to={`/movieList`}>
                    <button className="explore-button">Explore Movies</button>
                </Link>
            </div>
        </div>
    );
};

export default MoviePage;
