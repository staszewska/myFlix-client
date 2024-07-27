import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * component to display a movie's information in a card format
 * @param {Object} - a props object that has `movie` property
 * @returns {JSX.Element}
 */
export function MovieCard({ movie }) {
  return (
    <Card className="h-100">
      <Card.Img className="w-100" variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

// export const MovieCard = ({ movie }) => {
//   return (
//     <Card className="h-100">
//       <Card.Img className="w-100" variant="top" src={movie.image} />
//       <Card.Body>
//         <Card.Title>{movie.title}</Card.Title>
//         <Card.Text>{movie.director}</Card.Text>
//         <Link to={`/movies/${movie.id}`}>
//           <Button variant="link">Open</Button>
//         </Link>
//       </Card.Body>
//     </Card>
//   );
// };

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
