import React from "react";

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
      <label htmlFor="genre">Select Genre:</label>
      {/* event handler triggered when the value of dropdown changes  */}
      <select id="genre" onChange={(e) => onSelectGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
