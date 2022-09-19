import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../features/applicationSlice";
import styles from "./styles/authPage.module.css";

const SingIn = () => {
  const load = useSelector((state)=> state.application.load)
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePas = (e) => {
    setPassword(e.target.value);
  };
  const handleClick = (e) => {
    setLogin("");
    setPassword("");
    dispatch(loginThunk({ login, password }));
  };

  return (
    <div className={styles.auth}>
      <h2 className={styles.auth_title}>Авторизация</h2>
      <input
        className={styles.auth_input}
        placeholder="ЛОГИН"
        onChange={(e) => handleChange(e)}
        value={login}
        type="text"
      />
      <input
        className={styles.auth_input}
        placeholder="ПАРОЛЬ"
        onChange={(e) => handleChangePas(e)}
        value={password}
        type="password"
      />
      <p>У вас нет аккаунта? </p>

      <p className={styles.link}>
        <Link to="/auth">Зарегистрируйтесь</Link>
      </p>

      {load  ? <div class="newtons-cradle">
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
          </div> : <button className={styles.auth_btn} onClick={() => handleClick()}>
        Войти
      </button>}
    </div>
  );
};

export default SingIn;
