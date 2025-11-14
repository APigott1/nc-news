import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CommentInput from "./CommentInput";
import { UserContext } from "../contexts/User";
import getDateString from "../utils/getDateString";

const CommentList = ({ comments, getComments }) => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleDelete = (comment_id) => {
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/comments/${comment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) return Promise.reject(res);
      })
      .then(() => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
        setError({ status: "deleteError", msg: "delete failed" });
      });
  };
  return (
    <ul>
      <CommentInput getComments={getComments} />
      {comments.map((comment) => {
        const createdAt = new Date(comment.created_at);
        return (
          <li className="comment" key={comment.comment_id}>
            <p>Author: {comment.author}</p>
            <p>Comment: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Commented: {getDateString(comment)}</p>
            {comment.author === user.username && (
              <Link>
                <p
                  onClick={() => {
                    handleDelete(comment.comment_id);
                  }}
                >
                  {error ? error.msg : "delete?"}
                </p>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
