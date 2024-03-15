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
            <p>{movie.TITLE}</p>
            <img src={movie.IMG_POSTER} alt={movie.TITLE} />
        </Link>
    );
};

export default MovieListItem;
