import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "dotenv/config";

/**
 * Component for filtering movies by genre.
 * @param {Object} props - The component props.
 * @param {Function} props.onSelectGenre - Callback function to handle genre selection.
 * @returns {JSX.Element} The rendered component.
 */
function GenreFilter({ onSelectGenre }) {
  const [genres, setGenres] = useState([]);
  // const { genre } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch movies from API
    // fetch(`${process.env.DEV_API_URL}/movies/}`, {
    fetch(`https://movies-api-ms-b2173cbfa01b.herokuapp.com/movies/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        //Set is created and filters out duplicates
        const extractedGenres = Array.from(
          new Set(data.map((movie) => movie.Genre.Name))
        );

        setGenres(extractedGenres);
        // console.log(extractedGenres);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  return (
    <div>
      <Dropdown onSelect={(eventKey) => onSelectGenre(eventKey)}>
        <Dropdown.Toggle variant="info" id="genre-dropdown">
          All Genres
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="">All Genres</Dropdown.Item>
          {genres.map((genre) => (
            <Dropdown.Item key={genre} eventKey={genre}>
              {genre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
