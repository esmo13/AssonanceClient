import React, { useState } from "react";

const SongsForm = ({ setSongs, songs }) => {
  const [song, setSong] = useState({
    name: "",
  });

  const addSong = () => {
    if (song.name.length > 0) {
      setSongs([...songs, song]);
      setSong({ name: "" });
    }
  };

  return (
    <div>
      <label>Add song</label>
      <input
        placeholder="song name"
        onChange={(e) => setSong({ name: e.target.value })}
      />
      <button onClick={addSong}>Add song</button>
    </div>
  );
};

export default SongsForm;
