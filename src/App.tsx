import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MoviePage from "./Pages/MoviePage/MoviePage";
import Layout from "./Layout/Layout";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<MoviePage />} />
                        <Route path="/movieList" element={<MovieList />} />
                        <Route
                            path="/movieList/detail/:movieId"
                            element={<MovieDetails />}
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
};

export default App;
