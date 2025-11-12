import { useState } from "react";
import { Link } from "react-router-dom";
import CommentInput from "./CommentInput";

const CommentList = ({ comments, getComments }) => {
  const [error, setError] = useState(null);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

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
            <p>Commented: {createdAt.toLocaleDateString(undefined, options)}</p>
            {comment.author === "grumpy19" && (
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
