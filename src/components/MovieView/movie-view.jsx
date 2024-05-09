import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieView = ({ movies }) => {
  console.log("my movies: ", movies);
  const { movieId } = useParams();
  console.log("my movie ID: ", movieId);
  const movie = movies.find((m) => m.id === movieId);
  console.log("my movie is: ", movie);
  return (
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    genreDescription: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
