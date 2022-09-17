import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import styles from "../components/styles/moviePage.module.css";
import { fetchmovies,buymovies } from "../features/movieSlice";
import Alert from "@mui/material/Alert";
import { fetchUser } from "../features/usersSlice";
import Comments from "./Comments";
const MoviePage = () => {
 
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.application.token)
  const error = useSelector((state)=> state.users.error)
  const userid = useSelector((state)=> state.application.id)
  const load = useSelector((state)=> state.users.load)
  const load2 = useSelector((state)=> state.movies.movies)
  const [active,setactive] = useState(false)
  

  const { id } = useParams();
  const user = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchmovies());
   if(token){
    dispatch(fetchUser())
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

    if(!token){
      return notify()
    }
    
    dispatch(buymovies({userid,movieId}));
    notifisucces()

  };

  const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      {load && load2 ? (
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      ) : (
        movies.map((item) => {
          if (id === item._id) {
            return (
              <>
                <div key={item._id} className={styles.movie_page}>
                  <h1>{item.title}</h1>
                  <div className={styles.treiler}>
                    { item.price < 1  || (item.buyUsers.find((i) => i._id === userid))  ?  (
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
                      </ul>
                    </div>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                  <ToastContainer />
                </div>
                <hr />
                <Comments />
                <hr />
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
