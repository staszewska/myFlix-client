import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const GenreFilter = ({ onSelectGenre }) => {
  const genres = [
    "Action",
    "Adventure",
    "Biography",
    "Romance",
    "Crime",
    "Comedy",
    "War",
    "Drama",
    "Sci-Fi",
    "Thriller",
  ];

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
