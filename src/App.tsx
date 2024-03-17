import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./Pages/MovieList/MovieList";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import MoviePage from "./Pages/WelcomePage/WelcomePage";
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
