import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export const GenreFilter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);
  // const { genre } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
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

        // const extractedGenres = data.map((movie) => movie.Genre.Name);
        //Set is created and filters out duplicates
        const extractedGenres = Array.from(
          new Set(data.map((movie) => movie.Genre.Name))
        );

        setGenres(extractedGenres);
        console.log(extractedGenres);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  return (
    <div>
      {/* event handler triggered when the value of dropdown changes  */}
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
    // <div>
    //   <label htmlFor="genre">Select Genre:</label>
    //   {/* event handler triggered when the value of dropdown changes  */}
    //   <select id="genre" onChange={(e) => onSelectGenre(e.target.value)}>
    //     <option value="">All Genres</option>
    //     {genres.map((genre) => (
    //       <option key={genre} value={genre}>
    //         {genre}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
};
