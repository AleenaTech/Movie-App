import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getMovieDetails } from "../../redux/Movie/movieDetailsSlice";
import { useParams } from "react-router-dom";
import { MovieType } from "../../commonTypes";
import "./MovieDetails.css";

const MovieDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const { movieId } = useParams<{ movieId?: string }>();

    const fake = useAppSelector((state) => state.movieDetails.fake);
    const short = useAppSelector((state) => state.movieDetails.short);
    const loading = useAppSelector((state) => state.movieDetails.loading);
    const error = useAppSelector((state) => state.movieDetails.error);

    const [movieDetails, setMovieDetails] = useState<MovieType>({
        TITLE: "",
        IMDB_ID: "",
        IMG_POSTER: "",
        RANK: "",
        YEAR: "",
        ACTORS: [],
        DESCRIPTION: "",
        REVIEWS: {
            author: { name: "" },
            dateCreated: "",
            reviewBody: "",
            reviewRating: { bestRating: "", worstRating: "" },
        },
        KEYWORDS: "",
    });

    useEffect(() => {
        if (movieId) {
            dispatch(getMovieDetails(movieId));
        }
        return () => {
            setMovieDetails({
                TITLE: "",
                IMDB_ID: "",
                IMG_POSTER: "",
                RANK: "",
                YEAR: "",
                ACTORS: [],
                DESCRIPTION: "",
                REVIEWS: {
                    author: { name: "" },
                    dateCreated: "",
                    reviewBody: "",
                    reviewRating: { bestRating: "", worstRating: "" },
                },
                KEYWORDS: "",
            });
        };
    }, [dispatch, movieId]);

    useEffect(() => {
        if (fake && short) {
            const formattedDetails: Partial<MovieType> = {
                TITLE: fake["#TITLE"] || "",
                IMDB_ID: fake["#IMDB_ID"] || "",
                IMG_POSTER: fake["#IMG_POSTER"] || "",
                RANK: fake["#RANK"] || "",
                YEAR: fake["#YEAR"] || "",
                ACTORS: short.actor || [],
                DESCRIPTION: short.description || "",
                REVIEWS: short.review || {},
                KEYWORDS: short.keywords || "",
            };
            setMovieDetails((prevState) => ({
                ...prevState,
                ...formattedDetails,
            }));
        }
    }, [fake, short]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="movie-details-container">
            <h2>{movieDetails.TITLE}</h2>
            <img
                className="poster"
                src={movieDetails.IMG_POSTER}
                alt={movieDetails.TITLE}
            />
            <div className="details">
                <p>
                    <strong>Description:</strong> {movieDetails.DESCRIPTION}
                </p>
                <p>
                    <strong>Rank:</strong> {movieDetails.RANK}
                </p>
                <div className="actors">
                    <strong>Actors:</strong>
                    <ul>
                        {movieDetails.ACTORS.map(
                            (actor: any, index: number) => (
                                <li key={index}>{actor.name}</li>
                            )
                        )}
                    </ul>
                </div>
                <div className="reviews">
                    <h3>Reviews:</h3>
                    <p>
                        <strong>Best Rating:</strong>{" "}
                        {movieDetails.REVIEWS?.reviewRating?.bestRating}
                    </p>
                    <p>
                        <strong>Worst Rating:</strong>{" "}
                        {movieDetails.REVIEWS?.reviewRating?.worstRating}
                    </p>
                    <div className="review-details">
                        <p>
                            <strong>Author:</strong>{" "}
                            {movieDetails.REVIEWS?.author?.name}
                        </p>
                        <p>
                            <strong>Date:</strong>{" "}
                            {movieDetails.REVIEWS?.dateCreated}
                        </p>
                        <p>
                            <strong>Review:</strong>{" "}
                            {movieDetails.REVIEWS?.reviewBody}
                        </p>
                    </div>
                </div>
                <p>
                    <strong>Keywords:</strong> {movieDetails.KEYWORDS}
                </p>
            </div>
        </div>
    );
};

export default MovieDetails;
