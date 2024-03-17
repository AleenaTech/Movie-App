import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UiElements/Button/Button";

const MoviePage: React.FC = () => {
    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <h1>Welcome to our Movie App</h1>
                <p>Discover, explore, and enjoy your favorite movies.</p>
                <Link to={`/movieList`}>
                    <Button
                        buttonText="Explore Movies"
                        className="explore-button"
                    />
                </Link>
            </div>
        </div>
    );
};

export default MoviePage;
