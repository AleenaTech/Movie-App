import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getMovieDetails } from "../../redux/Movie/movieDetailsSlice";
import { useParams } from "react-router-dom";
import { MovieType } from "../../commonTypes";
import Loader from "../Loader/Loader";

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
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="movie-details-container">
            <h2 className="details-main-title">{movieDetails.TITLE}</h2>
            <div className="movie-details-wrap">
                <div className="detail-poster">
                    <img
                        className="poster"
                        src={movieDetails.IMG_POSTER}
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
