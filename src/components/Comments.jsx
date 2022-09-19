import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/moviePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import { fetchComments } from "../features/movieSlice";
import { useParams } from "react-router-dom";
import { addComment } from "../features/movieSlice";
import Comment from "./Comment";

const Comments = () => {
  const load = useSelector((state) => state.movies.loadComments);
  const token = useSelector((state)=> state.application.token)
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const notify = () =>
    toast("Вы должны сперва авторизоваться", {
      type: "error",
    });

  const user = useSelector((state) => state.application.id);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = ({ comment }) => {
    if(!token){
      return notify()
    }
    dispatch(addComment({ comment, id, user }));
    setComment("");
  };

  return (
    <>
      <div className={styles.comments_list}>
        <h2>Комментарии:</h2>
        <div className={styles.textarea_div}>
          <textarea
            value={comment}
            onChange={(e) => handleChange(e)}
            placeholder="Написать комментарий"
            rows={4}
          />


         {load ? <div class="newtons-cradle">
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
            <div class="newtons-cradle__dot"></div>
          </div> : <button onClick={() => handleAddComment({ comment })}>

            Добавить
          </button>}
        </div>
        <Comment id={id} />
      </div>
    </>
  );
};

export default Comments;
