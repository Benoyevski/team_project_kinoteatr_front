import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../components/styles/header.module.css";

const Header = () => {
  const load = useSelector((state) => state.users.load);
  const user = useSelector((state) => state.users.users);
  const token = useSelector((state) => state.application.token);
  const handleExit = () => {
    localStorage.clear();
    window.location.reload();
    window.location.href = "/";
  };
  return (
    <div className={styles.header}>
      <div className={styles.nav_menu}>
        <div className={styles.header_logo}>
          <Link to="/">
            <h1>BOMBIBBO.TV</h1>
          </Link>
        </div>
        {/* <div className={styles.nav_link}>
                    <ul className={styles.nav_link_list}>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/video">Каталог</Link></li>
                    </ul>
                </div> */}
        <div className={styles.nav_exit}>
          {!token ? (
            <Link to="/login">
              <button className={styles.signIn_btn}>
                Войти или Зарегистрироваться
              </button>
            </Link>
          ) : (
            <ul className={styles.nav_link_exit}>
              <li>
                <Link onClick={handleExit} to="/">
                  Выйти
                </Link>
              </li>
              <li>
                <Link o to="/user/like">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
