import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies, user, onUserProfileUpdate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [movie, setMovie] = useState(null);
  const token = localStorage.getItem("token");
  const { movieId } = useParams();
  // console.log("my movie ID: ", movieId);

  useEffect(() => {
    console.log("my movies: ", movies);
    if (!movies.length) {
      return;
    }

    console.log("my movies: ", movies);
    const movie = movies.find((m) => m.id === movieId);
    console.log("my movie is: ", movie);
    setMovie(movie);

    const isMarkedAsFavorite = user.favoriteMovies.find(
      (favoriteMovieId) => favoriteMovieId === movieId
    );
    console.log("[MovieView] isMarkedAsFavorite:", isMarkedAsFavorite);
    setIsFavorite(isMarkedAsFavorite);
  }, [movies]);

  // function to handle adding movie to favorites
  function handleAddMovieAsFavorite() {
    fetch(
      `https://movies-api-ms-b2173cbfa01b.herokuapp.com/users/${user.Name}/movies/${movieId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Movie added to favorites successfully!");
          return response.json();
        } else {
          alert("ERROR: Something went wrong!");
        }
      })
      .then((updatedUser) => {
        setIsFavorite(true);
        console.log("[MovieView] updatedUser:", updatedUser);
        onUserProfileUpdate(updatedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteMovieFromFavorite() {}

  return (
    <>
      {movie ? (
        <div>
          <div>
            <img src={movie.image} />
          </div>
          <div>
            <span>Title: </span>
            <span>{movie.title}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.director}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.genre}</span>
          </div>
          <div>
            <span>Genre-Description: </span>
            <span>{movie.genreDescription}</span>
          </div>

          {!isFavorite ? (
            <Button
              onClick={handleAddMovieAsFavorite}
              className="add-button"
              variant="primary"
            >
              Add to favorites
            </Button>
          ) : (
            <Button
              onClick={handleDeleteMovieFromFavorite}
              className="add-button"
              variant="outline-primary"
            >
              Remove from favorites
            </Button>
          )}

          <Link to={`/`}>
            <Button className="back-button">Back</Button>
          </Link>
        </div>
      ) : (
        <h1>Loading movie</h1>
      )}
    </>
  );
};

MovieView.propTypes = {
  //   movie: PropTypes.shape({
  //     title: PropTypes.string,
  //     image: PropTypes.string,
  //     director: PropTypes.string,
  //     description: PropTypes.string,
  //     genre: PropTypes.string,
  //     genreDescription: PropTypes.string,
  //   }).isRequired,
};
