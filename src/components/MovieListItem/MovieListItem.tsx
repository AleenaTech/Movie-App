import React from "react";
import { Link } from "react-router-dom";
import { MovieType } from "../../commonTypes";

interface MovieListItemProps {
    movie: MovieType;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
    return (
        <Link
            to={`/movieList/detail/${movie.IMDB_ID}`}
            className="movie-list-item"
        >
            <h4>{movie.TITLE}</h4>
            <div className="poster-wrap">
                <img src={movie.IMG_POSTER} alt={movie.TITLE} />
            </div>
        </Link>
    );
};

export default MovieListItem;
