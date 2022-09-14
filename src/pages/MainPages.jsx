import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchmovies } from "../features/movieSlice";
import { fetchgenre } from "../features/genreSclice";
import Movie from "../components/Movie";
import styles from "../components/styles/main.module.css";
import { Link, useParams } from "react-router-dom";
const MainPages = () => {
  
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchmovies());
    dispatch(fetchgenre());
  }, []);
  const categories = ["ВСЕ", "Платные", "Бесплатные"];
  const years = [
    2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
    2010, 2009,
  ];
  const country = ["Россия", "США", "Великобритания", "Франция", "Испания"];
  const params = useParams();
  const id = params.id;
  const [titleGenre, settitleGenre] = useState("Все жанры");
  const [titleYears, settitleYears] = useState("Все года");
  const [titleCountry, settitleCountry] = useState("Все страны");

 

  const genres = useSelector((state) => state.genres.genres);
  const movies = useSelector((state) => state.movies.movies);

  const handleClickGenre = (name) => {
    settitleGenre(name);
  };
  const handleClickYears = (name) => {
    settitleYears(name);
  };
  const handleClickCountry = (name) => {
    settitleCountry(name);
  };

  const onclickCategory = (index) => {
    setActive(index);
  };

  const filteredgenre = movies.filter((item) => {
    if (!id) {
      return true;
    }
    return item.genre.includes(id) || item.year == id || item.country == id;
  });
 
  return (
    <div className={styles.main}>
      <div className={styles.main_title}>
        <h2>Все фильмы</h2>
      </div>
      <div className={styles.categoryfilters}>
        <div className={styles.categoryfilters_item}>
          {categories.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => onclickCategory(i)}
                className={
                  active === i ? styles.categoryActive : styles.categorynoActive
                }
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>{titleGenre}</button>
          <ul className={styles.dropdown_content} name="Жанры">
            {genres.map((genre) => {
              return (
                <li>
                  <Link
                    onClick={() => handleClickGenre(genre.nameGenre)}
                    to={`/genre/${genre._id}`}
                  >
                    {" "}
                    {genre.nameGenre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>{titleYears}</button>
          <ul className={styles.dropdown_content}>
            {years.map((i) => {
              return (
                <li>
                  <Link onClick={() => handleClickYears(i)} to={`/years/${i}`}>
                    {i}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>{titleCountry}</button>
          <ul className={styles.dropdown_content}>
            {country.map((i) => {
              return (
                <li>
                  <Link
                    onClick={() => handleClickCountry(i)}
                    to={`/country/${i}`}
                  >
                    {i}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.main_content}>
        {filteredgenre.map((movie) => {
          return <Movie movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MainPages;
