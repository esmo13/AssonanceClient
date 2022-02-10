import React, { useState, useEffect, useCallback } from "react";
import { Rating } from "react-simple-star-rating";

import axios from "axios";
import styles from "./SingleAlbum.module.scss";

const SingleAlbum = ({ user }) => {
  const [album, setAlbum] = useState(null);
  const [rating, setRating] = useState(0);
  const [flag, setFlag] = useState(false);
  const [comment, setComment] = useState({
    content: "",
    user_: user,
    album_: album,
  });
  const [comments, setComments] = useState([]);
  const [commentsUpdatedFlag, setCommentsUpdatedFlag] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [ratingsUpdatedFlag, setRatingsUpdatedFlag] = useState(false);

  const id = window.location.pathname.split("/")[2];

  const fetchAlbum = async () => {
    await axios
      .get(`https://localhost:44338/api/albums/${id}`)
      .then((res) => {
        setAlbum(res.data);
      })
      .then(() => {
        setFlag(true);
      })
      .then(async () => {
        await axios
          .get(`https://localhost:44338/api/rating/${id}/${user.id}`)
          .then((res2) => {
            setRating(res2.data);
          });
      });
  };

  const fetchRating = useCallback(async () => {}, []);

  useEffect(() => {
    axios.get(`https://localhost:44338/api/rating/avg/${id}`).then((res) => {
      setAvgRating(res.data);
    });
    axios.get(`https://localhost:44338/api/rating/count/${id}`).then((res) => {
      setRatingCount(res.data);
    });
    setRatingsUpdatedFlag(false);
  }, [id, ratingsUpdatedFlag]);
  useEffect(() => {
    axios
      .get(`https://localhost:44338/api/comments/ofalbum/${id}`)
      .then((res) => {
        setComments(res.data);
        setCommentsUpdatedFlag(false);
      });
  }, [id, commentsUpdatedFlag]);

  useEffect(() => {
    fetchAlbum();
  }, [ratingsUpdatedFlag]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating, flag]);

  const submitRating = (rate) => {
    if (rating.rating > 0) {
      console.log("putuje");
      axios
        .put(`https://localhost:44338/api/rating/${rating.id}`, {
          rating: rate,
        })
        .then(() => setRatingsUpdatedFlag(true));
    } else {
      console.log("postuje");
      axios
        .post("https://localhost:44338/api/rating/", {
          userid: user.id,
          albumid: album.id,
          rating: rate,
        })
        .then(() => setRatingsUpdatedFlag(true));
    }
    setRating(rate);
  };

  const handleRating = (rate) => {
    submitRating(rate / 20);
  };
  const handleComment = () => {
    var temp = comment;
    temp.album_ = album;
    setComment(temp);
    axios
      .post("https://localhost:44338/api/comments/", comment)
      .then(() => setCommentsUpdatedFlag(true));
  };

  return (
    <div className={styles.main}>
      {album && (
        <div className={styles.singleAlbum_container}>
          <div className={styles.singleAlbum_left}>
            <img src={album.cover} alt="cover" className={styles.cover} />
            <div>
              <h3>Track List</h3>
              <ul>
                {album.songs
                  .sort((c, d) => c.id - d.id)
                  .map((song, i) => (
                    <div className={styles.song}>
                      <span>{i + 1}</span>
                      <li>{song.name}</li>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
          <div className={styles.singleAlbum_right}>
            <div className={styles.album_info}>
              <h1>{album.name}</h1>
              <hr className={styles.hr} />
              <div className={styles.info}>
                <span>Author</span>
                <p>{album.author.name}</p>
              </div>
              <div className={styles.info}>
                <span>Country</span>
                <p>{album.author.country}</p>
              </div>
              <div className={styles.info}>
                <span>Released</span>
                <p>{album.released.substring(0, 10)}</p>
              </div>
              <div className={styles.info}>
                <span>Genre</span>
                <p>{album.genres[0].name}</p>
              </div>
              <div className={styles.info}>
                <span>ASSO rating</span>
                <p>
                  {avgRating} in {ratingCount} ratings
                </p>
              </div>
            </div>
            <div className={styles.rating}>
              <h3>Rate</h3>
              <Rating
                onClick={Object.keys(user).length > 0 && handleRating}
                ratingValue={rating.rating * 20}
                allowHalfIcon={true}
                showTooltip={true}
                tooltipDefaultText={
                  Object.keys(user).length === 0 && "Log in to rate"
                }
                tooltipArray={
                  Object.keys(user).length === 0 && ["Log in to rate"]
                }
              />
            </div>
            <div className={styles.comments_container}>
              <div className={styles.add_comment}>
                <h4>Leave a comment</h4>
                <textarea
                  onChange={(e) =>
                    setComment({ ...comment, content: e.target.value })
                  }
                  placeholder="say something..."
                ></textarea>
                <button
                  onClick={
                    Object.keys(user).length > 0 ? handleComment : undefined
                  }
                >
                  Submit comment
                </button>
              </div>
              <div className={styles.comments}>
                <h4>Comments</h4>
                {comments.length === 0 ? (
                  <p>There are no comments yet!</p>
                ) : (
                  comments.map((com) => (
                    <div className={styles.comment}>
                      <h5 className={styles.user}>{com.user_.name}</h5>
                      <p className={styles.comment_content}>{com.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAlbum;
