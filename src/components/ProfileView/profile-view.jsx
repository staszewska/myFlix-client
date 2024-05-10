import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, movies }) => {
  console.log("movies:", movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  console.log(user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user.favoriteMovies) {
      const filteredMovies = movies.filter((movie) => {
        return user.favoriteMovies.includes(movie.id);
      });

      setFavoriteMovies(filteredMovies);
    }
  }, [movies]);

  if (!user) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  console.log(user);
  console.log(user.favoriteMovies);
  return (
    <>
      <div>
        <h2>Favorite Movies</h2>

        <div className="movie-list">
          {favoriteMovies.length === 0 ? (
            <div>No movies</div>
          ) : (
            favoriteMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          )}
        </div>
      </div>

      <Form>
        <h2>Profile</h2>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" placeholder="Enter birthday" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter gender" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
