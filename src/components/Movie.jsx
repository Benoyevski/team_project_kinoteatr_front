import React, { useEffect, useState } from "react";
import styles from "./styles/movie.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../features/usersSlice";

const Movie = ({ movie }) => {

  const [fav, setFav] = useState(false)
  const dispatch = useDispatch();
  const id = useSelector((state) => state.application.id);
 const favorite = useSelector((state) => state.users.favorite);

console.log(favorite);

  const handleFavorite = (movieId) => {
    dispatch(addToFavorite({ id, movieId }));
    setFav(true)
  };

  return (
    <div className={styles.movie_card}>
      <Link to={`/movie/${movie._id}`}>
        <div className={styles.movie_image}>
          <img src={`http://localhost:4000/images/${movie.image}`} alt="" />
        </div>
      </Link>
      <div className={styles.title_favorite}>
        <h4>{movie.title}</h4>
        <div
          onClick={() => handleFavorite(movie._id)}
          className={fav ? styles.favorite : styles.noFavorite}
        >
          ❤
        </div>
      </div>
      <div className={styles.movie_inner}>
        {movie.price == 0 ? "Бесплатно" : `${movie.price}`}
      </div>
    </div>
  );
};

export default Movie;
