import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Albums.module.scss";

import logo from "../../images/logo.svg";
import { useEffect } from "react/cjs/react.development";
import axios from "axios";

const Albums = ({ albums }) => {
  const [albumCount, setAlbumCount] = useState(0);
  const [artistCount, setArtistCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [albumQuery, setAlbumQuery] = useState("");
  useEffect(() => {
    axios.get(`https://localhost:44338/api/rating/count`).then((res) => {
      setRatingCount(res.data);
    });
    axios.get(`https://localhost:44338/api/albums/count`).then((res) => {
      setAlbumCount(res.data);
    });
    axios.get(`https://localhost:44338/api/comments/count`).then((res) => {
      setCommentCount(res.data);
    });
    axios.get(`https://localhost:44338/api/artists/count`).then((res) => {
      setArtistCount(res.data);
    });
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <div className={styles.welcome}>
          <img src={logo} alt="logo" />
          <div className={styles.welcome_desc}>
            <h1>Welcome to Assonance</h1>
            <p>Assonance is my (poor) attempt to mock Rate Your Music, WIP</p>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Albums:{albumCount}</span>
            <p></p>
          </div>
          <div className={styles.stat}>
            <span>Artists:{artistCount}</span>
            <p></p>
          </div>
          <div className={styles.stat}>
            <span>Ratings:{ratingCount}</span>
            <p></p>
          </div>
          <div className={styles.stat}>
            <span>Comments:{commentCount}</span>
            <p></p>
          </div>
        </div>

        <div className={styles.albums}>
          <h1>Albums</h1>
          <input
            placeholder="search album"
            value={albumQuery}
            onChange={(e) => setAlbumQuery(e.target.value)}
          />
          {albums.length === 0 ? (
            <p>loading</p>
          ) : (
            albums
              .filter((alb) => {
                if (albumQuery === "") return albums;
                else if (
                  alb.name.toLowerCase().includes(albumQuery.toLowerCase())
                ) {
                  return albums;
                }
              })
              .map((album) => (
                <Link key={album.id} to={`/album/${album.id}/`}>
                  <div className={styles.album}>
                    <img src={album.cover} alt="cover" />
                    <div>
                      <h2>{album.name}</h2>
                      <p>{album.author.name}</p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>

      <button onClick={() => console.log(albums)}></button>
    </div>
  );
};

export default Albums;
