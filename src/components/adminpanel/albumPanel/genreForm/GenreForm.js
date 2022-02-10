import React, { useState } from "react";
import axios from "axios";

const GenreForm = ({ setFlag, setGenreFormVis }) => {
  const [genre, setGenre] = useState({
    name: "",
  });

  const submitGenre = (e) => {
    e.preventDefault();

    try {
      axios.post("https://localhost:44338/api/genres", genre).then(() => {
        setFlag(true);
        setGenreFormVis(false);
        setGenre({ name: "" });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // name dor songs:[] artistID, genreID ? cover:""

  return (
    <div>
      <form onSubmit={submitGenre}>
        <label>Add genre</label>
        <input
          placeholder="name"
          value={genre.name}
          onChange={(e) => setGenre({ name: e.target.value })}
        />
        <button>add genre</button>
      </form>
    </div>
  );
};

export default GenreForm;
