import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../components/styles/moviePage.module.css";
import { fetchmovies } from "../features/movieSlice";
import Alert from "@mui/material/Alert";
import { buymovies, fetchUser } from "../features/usersSlice";
import Comment from "./Comment";
const MoviePage = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state)=> state.application.id)
  const load = useSelector((state)=> state.users.load)
  const { id } = useParams();
  const user = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchmovies());
    dispatch(fetchUser());
  }, [dispatch]);
  const handlebuy = (movieId) => {
    dispatch(buymovies({userid,movieId}));
  };

  const movies = useSelector((state) => state.movies.movies);

  return (
    <>
    {load? <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
          :  movies.map((item) => {
            if (id === item._id) {
              return ( <>
                <div className={styles.movie_page}>
                  <h1>{item.title}</h1>
                  <div className={styles.treiler}>
                    {user[0].buymovies.find((i) => i._id === item._id) ? (
                      <iframe
                        width="90%"
                        height="500px"
                        src="https://www.youtube.com/embed/0zTYJYn23sA"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    ) : (
                      <div className={styles.alert}>
                        <Alert variant="filled" severity="error">
                          Фильм доступен только после оплаты!
                        </Alert>
                        <button onClick={()=> handlebuy(item._id)} className={styles.buy_btn}>Купить</button>
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
                      </ul>
                    </div>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <Comment/>
               </>
              );
            }
            return null;
          })}
    </>
  );
};

export default MoviePage;
