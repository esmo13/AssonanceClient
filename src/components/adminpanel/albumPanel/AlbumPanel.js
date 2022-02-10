import React, { useState, useEffect, useRef } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";

import ArtistForm from "./artistForm/ArtistForm";
import GenreForm from "./genreForm/GenreForm";
import SongsForm from "./songsForm/SongsForm";

import styles from "./AlbumPanel.module.scss";
import { IoMdAddCircle as Add } from "react-icons/io";
import { MdRemoveCircle as Remove } from "react-icons/md";

const AlbumPanel = ({ user, fetchFlag, setFetchFlag }) => {
  // fetch all artists
  const [artists, setArtists] = useState([]);
  const [artistQuery, setArtistQuery] = useState("");
  const [artistFormVis, setArtistFormVis] = useState(false);
  const [artist, setArtist] = useState({
    id: "",
    name: "",
    country: "",
  });
  //states for genre
  const [genreVis, setGenreVis] = useState(false);
  const [genreFormVis, setGenreFormVis] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState({
    id: "",
    name: "",
  });
  const [genreQuery, setGenreQuery] = useState("");
  // flag
  const [flag, setFlag] = useState(false);
  //name of the album
  const [albumName, setAlbumName] = useState("");
  const [albumNameVis, setAlbumNameVis] = useState(false);
  //states for songs
  const [songs, setSongs] = useState([]);
  const [songsFormVis, setSongsFormVis] = useState(false);
  //date state
  const [releaseDate, setReleaseDate] = useState("");
  //cover state
  const [file, setFile] = useState("");

  const submitAlbum = (e) => {
    e.preventDefault();

    axios
      .post("https://localhost:44338/api/albums", {
        name: albumName,
        released: releaseDate,
        songs: songs,
        author: artist,
        genres: [genre],
        cover: file.base64,
      })
      .then(() => {
        console.log(fetchFlag);
        console.log(setFetchFlag);
        setFetchFlag(true);
        console.log(fetchFlag);
      });
  };

  const artistSelectRef = useRef();

  const getArtists = () => {
    try {
      axios.get("https://localhost:44338/api/artists").then((res) => {
        setArtists(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGenres = () => {
    try {
      axios.get("https://localhost:44338/api/genres").then((res) => {
        setGenres(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleArtist = (e) => {
    setArtist({
      id: JSON.parse(e.target.value).id,
      name: JSON.parse(e.target.value).name,
      country: JSON.parse(e.target.value).country,
    });
    setGenreVis(true);
  };

  const handleGenre = (e) => {
    setGenre({
      id: JSON.parse(e.target.value).id,
      name: JSON.parse(e.target.value).name,
    });
    setGenreVis(true);
    setAlbumNameVis(true);
  };

  const removeSong = (song) => {
    setSongs(songs.filter((item) => item.name !== song));
  };

  useEffect(() => {
    getArtists();
    getGenres();
    setFlag(false);
  }, [flag]);

  return (
    <div className={styles.album_panel}>
      {Object.keys(user).length === 0 || user.role !== 1 ? (
        <p>you are not permitted to view this site.</p>
      ) : (
        <div className={styles.album_panel_container}>
          <h1>Add Album</h1>
          <form onSubmit={submitAlbum}>
            <label>Artist</label>
            <br />
            <input
              placeholder="search artist"
              value={artistQuery}
              onChange={(e) => setArtistQuery(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <select
                ref={artistSelectRef}
                defaultValue=""
                onChange={handleArtist}
              >
                <option value="" disabled>
                  Select your option
                </option>
                {artists
                  .filter((artist) => {
                    if (artistQuery === "") {
                      return artists;
                    } else if (
                      artist.name
                        .toLowerCase()
                        .includes(artistQuery.toLowerCase())
                    ) {
                      return artists;
                    }
                  })
                  .map((artist) => (
                    <option key={artist.id} value={JSON.stringify(artist)}>
                      {artist.name}
                    </option>
                  ))}
              </select>

              <Add
                onClick={() => setArtistFormVis(!artistFormVis)}
                className={styles.add_btn}
              />
            </div>
            {genreVis && (
              <>
                <label>Genre</label>
                <input
                  placeholder="search genre"
                  value={genreQuery}
                  onChange={(e) => setGenreQuery(e.target.value)}
                />
                <div style={{ display: "flex" }}>
                  <select onChange={handleGenre} defaultValue="">
                    <option value="" disabled>
                      Select your option
                    </option>
                    {genres
                      .filter((genre) => {
                        if (genreQuery === "") {
                          return genres;
                        } else if (
                          genre.name
                            .toLowerCase()
                            .includes(genreQuery.toLowerCase())
                        ) {
                          return genres;
                        }
                      })
                      .map((genre) => (
                        <option key={genre.id} value={JSON.stringify(genre)}>
                          {genre.name}
                        </option>
                      ))}
                  </select>
                  <Add
                    onClick={() => setGenreFormVis(!genreFormVis)}
                    className={styles.add_btn}
                  />
                </div>
              </>
            )}
            {albumNameVis && (
              <div>
                <label>Name of the album</label>

                <input
                  placholder="name"
                  onChange={(e) => setAlbumName(e.target.value)}
                />
              </div>
            )}

            {albumName.length > 0 && (
              <div>
                <div className={styles.songs_label}>
                  <label>Songs</label>
                  <Add
                    onClick={() => setSongsFormVis(!songsFormVis)}
                    className={styles.add_btn}
                  />
                </div>

                {songs.map((song, i) => (
                  <div key={i} className={styles.song}>
                    <p key={i}>{song.name}</p>
                    <Remove
                      onClick={() => removeSong(song.name)}
                      className={styles.remove_btn}
                    />
                  </div>
                ))}
              </div>
            )}
            {songs.length > 0 && (
              <div>
                <label>Release date</label>
                <input
                  type="date"
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
            )}
            {releaseDate.length > 0 && (
              <div>
                <label>Attach a cover</label>
                <FileBase64
                  multiple={false}
                  onDone={(img) => setFile(img)}
                  id="img"
                />
                {file && (
                  <img src={file.base64} alt="hello" className={styles.cover} />
                )}
              </div>
            )}
            {file && <button>Add album</button>}
          </form>
        </div>
      )}
      {(artistFormVis || genreFormVis || songsFormVis) && (
        <div className={styles.modal}>
          {artistFormVis && (
            <ArtistForm
              setFlag={setFlag}
              setArtistFormVis={setArtistFormVis}
              className={styles.modal}
            />
          )}
          {genreFormVis && (
            <GenreForm
              setFlag={setFlag}
              setGenreFormVis={setGenreFormVis}
              className={styles.modal}
            />
          )}
          {songsFormVis && (
            <SongsForm
              setSongs={setSongs}
              songs={songs}
              className={styles.modal}
            />
          )}
        </div>
      )}

      {/* {file && (
            <img src={file.base64} alt="hello" className="h-20 w-20 mx-auto" />
          )} */}
    </div>
  );
};

export default AlbumPanel;
