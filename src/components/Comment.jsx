import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles/moviePage.module.css";
const Comment = ({ id }) => {
  const comments = useSelector((state) => state.movies.comments);
  return (
    <>
      {comments
        .map((item) => {
          if (item.movie === id) {
            return (
              <div key={item._id} className={styles.one_comment}>
                <div className={styles.comment_login}>
                  <h3 className={styles.user_login} >{item.user.login}</h3>
                </div>
                <p>{item.comment}</p>
              </div>
            );
          }
          return null;
        })
        .reverse()}
    </>
  );
};

export default Comment;
