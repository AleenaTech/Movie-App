import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import useMovieSDK from "../../customHooks/useMovieSDK";
import { MovieType } from "../../commonTypes";

const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId?: string }>();
    const { movieDetailsState, fetchMovieDetails } = useMovieSDK();

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
            fetchMovieDetails(movieId);
        }

        // Cleanup function to clear movie details state when component unmounts
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
    }, [movieId]);

    useEffect(() => {
        const { fake, short } = movieDetailsState;
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
    }, [movieDetailsState]);

    if (movieDetailsState.loading) {
        return <Loader />;
    }

    if (movieDetailsState.error) {
        return <p>Error: {movieDetailsState.error}</p>;
    }

    return (
        <div className="movie-details-container">
            <h2 className="details-main-title">{movieDetails.TITLE}</h2>
            <div className="movie-details-wrap">
                <div className="detail-poster">
                    <img
                        className="poster"
                        src={
                            movieDetails.IMG_POSTER ||
                            require("../../assets/images/NoImage.png")
                        }
                        alt={movieDetails.TITLE}
                    />
                </div>
                <div className="details">
                    <p>
                        <strong>Description: </strong>{" "}
                        {movieDetails.DESCRIPTION}
                    </p>
                    <p>
                        <strong>Rank: </strong> {movieDetails.RANK}
                    </p>
                    <div className="actors">
                        <strong>Actors: </strong>
                        <ul>
                            {movieDetails.ACTORS.map(
                                (actor: any, index: number) => (
                                    <li key={index}>{actor.name}</li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="reviews">
                <h3>Latest Review</h3>

                <div className="review-details">
                    <div className="review-basics">
                        <p style={{ textTransform: "capitalize" }}>
                            <strong>Review Author: </strong>
                            {movieDetails.REVIEWS?.author?.name}
                        </p>
                        <p>
                            <strong>Date Posted: </strong>
                            {movieDetails.REVIEWS?.dateCreated}
                        </p>
                    </div>
                    <p>
                        <strong>Review: </strong>
                        {movieDetails.REVIEWS?.reviewBody}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
