import React, { useEffect, useState } from "react";
import styles from "./styles/movie.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFavorite } from "../features/usersSlice";

const Movie = ({ movie }) => {


  const dispatch = useDispatch();
  const id = useSelector((state) => state.application.id);
  const user = useSelector((state) => state.users.users);
  const notify = () => toast("Фильм добавлен в избранное!", {
    type:'success'
});

const notifydelete = () => toast("Фильм удален!", {
  type:'error'
});


  const handleFavorite = (movieId) => {
    if (user[0].movies.find((i) => i._id === movie._id)) {
      notifydelete()
      return dispatch(removeFavorite({ id, movieId }));
    }
    notify()
    dispatch(addToFavorite({ id, movieId }));
    

  };

  return (
    <div className={styles.movie_card}>

      <div className={styles.movie_card_content}>
        <Link to={`/movie/${movie._id}`}>
          <div className={styles.movie_image}>
            <img src={`http://localhost:4000/images/${movie.image}`} alt="" />
          </div>
        </Link>
        <div className={styles.movie_title}>
          <div>
            <h4>{movie.title}</h4>
            <div
              onClick={() => handleFavorite(movie._id)}
              className={
                user[0].movies.find((i) => i._id === movie._id)
                  ? styles.favorite_select
                  : styles.favorite
              }
            >
              ❤
            </div>
          </div>
        </div>
        <div className={styles.movie_inner}>
          {movie.price === 0 ? "Бесплатно" : `Платный`}

        </div>
        
      </div>

      <ToastContainer />

    </div>
    
  );
};

export default Movie;
