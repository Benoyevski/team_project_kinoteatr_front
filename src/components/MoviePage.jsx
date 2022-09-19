import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import styles from "../components/styles/moviePage.module.css";
import { fetchmovies, buymovies, showRating } from "../features/movieSlice";
import Alert from "@mui/material/Alert";

import Comments from "./Comments";
import Rating from "./Rating";
import { fetchUser } from "../features/usersSlice";

const MoviePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.application.token);
  const error = useSelector((state) => state.users.error);
  const userid = useSelector((state) => state.application.id);
  const load = useSelector((state) => state.users.load);
  const load2 = useSelector((state) => state.movies.load);
  const visible = useSelector((state) => state.movies.isVisible);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchmovies());
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);
  const notify = () =>
    toast("Вы должны сперва авторизироваться", {
      type: "error",
    });
  const notifisucces = () =>
    toast("Куплено", {
      type: "success",
    });
  const handlebuy = (movieId) => {
    if (!token) {
      return notify();
    }

    dispatch(buymovies({ userid, movieId }));
    notifisucces();
  };
  const handleRated = () => {
    dispatch(showRating());
  };


  const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      {load2 ? (
        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>
      ) : (
        movies.map((item) => {
          if (id === item._id) {
            return (
              <>
                <div key={item._id} className={styles.movie_page}>
                  <h1>{item.title}</h1>
                  <div className={styles.treiler}>
                    {item.price < 1 ||
                    item.buyUsers.find((i) => i._id === userid) ? (
                      <div></div>
                    ) : (
                      <div className={styles.alert}>
                        <Alert variant="filled" severity="error">
                          Фильм доступен только после оплаты!
                        </Alert>
                        <button
                          onClick={() => handlebuy(item._id)}
                          className={styles.buy_btn}
                        >
                          Купить
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.movie_info}>
                    <div className={styles.image}>
                      <img
                        src={`http://localhost:4000/images/${item.image}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <ul className={styles.info_list}>
                        <li>Год: {item.year}</li>
                        <li>Страна: {item.country}</li>
                        <li>
                          Жанр:
                          {item.genre.map((el, index, arr) => {
                            if (index === arr.length - 1) {
                              return ` ${el.nameGenre}.  `;
                            }
                            return ` ${el.nameGenre},  `;
                          })}
                        </li>
                        <li>
                          Актеры:
                          {item.actors.map((actor, index, arr) => {
                            if (index === arr.length - 1) {
                              return ` ${actor}. `;
                            }
                            return ` ${actor}, `;
                          })}
                        </li>
                        <li className="movieLi">
                          <div
                            className={
                              item.rating === 0
                                ? "rating0"
                                : item.rating <= 3
                                ? "rating1-3"
                                : item.rating <= 6
                                ? "rating3-6"
                                : "rating6-10"
                            }
                          >
                            {item.rating}
                          </div>
                          {token ? (
                            <button
                              onClick={handleRated}
                              className="ratedButton"
                            >
                              Оценить
                            </button>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                  <ToastContainer />
                </div>
                {item.price < 1 ||
                item.buyUsers.find((i) => i._id === userid) ? (
                  <div className="videoContainer">
                    <video
                      id="videoPlayer"
                      controls
                      width="60%"
                      poster={`http://localhost:4000/images/${item.poster}`}
                    >
                      <source
                        src={`http://localhost:4000/video/${item.video}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : null}
                <hr />
                <Comments />
                <hr />
                {visible ? <Rating id={id} /> : null}
              </>
            );
          }
          return null;
        })
      )}
    </>
  );
};

export default MoviePage;
