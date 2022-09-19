import React, { useEffect, useState } from "react";
import styles from "./styles/movie.module.css";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToFavorite, removeFavorite } from "../features/usersSlice";
import { Button } from "@mui/material";
import { removebuymovies } from "../features/usersSlice";

const Movie = ({ movie }) => {
  const token = useSelector((state) => state.application.token);
  const path = useLocation();

  const dispatch = useDispatch();
  const params = useParams();
  const idroute = params.id;
  const id = useSelector((state) => state.application.id);
  const user = useSelector((state) => state.users.users);
  const userload = useSelector((state) => state.users.load);
  const error = useSelector((state) => state.users.error);
  const notify = () =>
    toast("Фильм добавлен в избранное!", {
      type: "success",
    });

  const notifydelete = () =>
    toast("Фильм удален!", {
      type: "error",
    });

  const handleFavorite = (movieId) => {
    if (user[0].movies.find((i) => i._id === movie._id)) {
      notifydelete();
      return dispatch(removeFavorite({ id, movieId }));
    }
    notify();
    dispatch(addToFavorite({ id, movieId }));
  };

  const handledelete = (movieId) => {
    dispatch(removebuymovies({ id, movieId }));
    notifydelete()
  };

  return (
    <div className={styles.movie_card}>
      <div className={styles.movie_card_content}>
        <Link to={`/movie/${movie._id}`}>
          <div className={styles.movie_image}>
            <img src={`http://localhost:4000/images/${movie.image}`} alt="" />
          </div>
        </Link>
        <div className={styles.movie_info}>
          <div className={styles.movie_title}>
            <h4>{movie.title}</h4>
            {token && !error ? (
              <div
                onClick={() => handleFavorite(movie._id)}
                className={
                  token
                    ? user[0].movies.find((i) => i._id === movie._id)
                      ? styles.favorite_select
                      : styles.favorite
                    : styles.favorite
                }
              >
                ❤
              </div>
            ) : null}
          </div>
          <div
            className={
              movie.rating === 0
                ? "rating0"
                : movie.rating <= 3
                ? "rating1-3"
                : movie.rating <= 6
                ? "rating3-6"
                : "rating6-10"
            }
          >
            {movie.rating}
          </div>
          <div className={styles.movie_inner}>
            {movie.price === 0 ? "Бесплатно" : `Платный`}
          </div>
          {path.pathname === "/user/buy" ? (
            <button  onClick={() => handledelete(movie._id)} className="btn_delete">
              <span className="text">Удалить</span>
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
