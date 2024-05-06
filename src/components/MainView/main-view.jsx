import React, { useState } from "react";
import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { useState, useEffect } from "react";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

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

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
