import React, { useState } from "react";
import axios from "axios";

const ArtistForm = ({ setFlag, setArtistFormVis }) => {
  const [artist, setArtist] = useState({
    name: "",
    country: "",
  });

  const submitArtist = (e) => {
    e.preventDefault();

    try {
      axios.post("https://localhost:44338/api/artists", artist).then(() => {
        setFlag(true);
        setArtistFormVis(false);
        setArtist({
          name: "",
          country: "",
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={submitArtist}>
        <label>Add Artist</label>
        <input
          placeholder="name"
          value={artist.name}
          onChange={(e) => setArtist({ ...artist, name: e.target.value })}
        />
        <input
          placeholder="country"
          value={artist.country}
          onChange={(e) => setArtist({ ...artist, country: e.target.value })}
        />
        <button>Add artist</button>
      </form>
    </div>
  );
};

export default ArtistForm;
