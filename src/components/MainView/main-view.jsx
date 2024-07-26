import React, { useState } from "react";
import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { ProfileView } from "../ProfileView/profile-view";
import { NavBar } from "../NavBar/nav-bar";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GenreFilter } from "../Filter/genre-filter";
import "dotenv/config";

/**
 * component handles routing and displays movies, user profile update,
 * login, signup, and genre filter
 * @returns {JSX.Element}
 */
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    // fetch(`${process.env.DEV_API_URL}/movies`, {
    fetch("https://movies-api-ms-b2173cbfa01b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            genre: doc.Genre.Name,
            genreDescription: doc.Genre.Description,
            director: doc.Director.Name,
            image: doc.ImagePath,
          };
        });
        // console.log("movies after map:", moviesFromApi);
        setMovies(moviesFromApi);
      });
  }, [token]);

  /**
   * handles user logout
   */
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  /**
   * function to update user profile
   * @param {Object} userData - user data
   */
  const handleUserProfileUpdate = (userData) => {
    setUser(userData);
    if (!userData) {
      localStorage.clear();
      return;
    }
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /*
   * function to handle genre change
   * @param {string} genre - selected genre
   * */

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  /**
   * function to filter movies based on selected genre
   * @returns {Array} - filtered movies
   */
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre === selectedGenre)
    : movies;

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />

      <Row className="mt-3">
        <h1>Movie Filter</h1>
        <GenreFilter onSelectGenre={handleGenreChange} />
      </Row>

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {!user ? (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                ) : (
                  <Navigate to="/" />
                )}
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {!user ? (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                ) : (
                  <Navigate to="/" />
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <ProfileView
                  user={user}
                  movies={movies}
                  onUserProfileUpdate={handleUserProfileUpdate}
                />
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      onUserProfileUpdate={handleUserProfileUpdate}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : selectedGenre && filteredMovies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {/* if both conditions are met we render filtered movies */}
                    {selectedGenre
                      ? filteredMovies.map((movie) => (
                          <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                      : // render all movies
                        movies.map((movie) => (
                          <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
