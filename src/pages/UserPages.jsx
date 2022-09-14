import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/usersSlice";
import styles from "../components/styles/userPages.module.css";
import { Link } from "react-router-dom";
import avatar from "./dSxCxs3Vgzk.jpg"
import { Avatar } from "@mui/material";
import FavoritePages from "./FavoritePages";
const UserPages = () => {
  const id = useSelector((state) => state.application.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector((state) => state.users.users);

  return (
    <div>
      {user.map((item) => {
        return (
          <>
           
            <div className={styles.user_name}>
            <Avatar
            className={styles.avatar}
              alt="Remy Sharp"
              src={avatar}
              sx={{ width: 56, height: 56 }}
            />
              <h2>{item.login}</h2>
            </div>

            <div className={styles.user_nav}>
              <div className={styles.user_nav_item}>
                <Link to="/favorites">Избранное</Link>
              </div>
              <div className={styles.user_nav_item}>
                <Link to="/subscribe">Купленные</Link>
              </div>
              <div className={styles.user_nav_item}>
                <Link to="/settings">Настройки</Link>
              </div>
            </div>
            <FavoritePages films = {item.movies} />
          </>
        );
      })}

      
    </div>
  );
};

export default UserPages;
