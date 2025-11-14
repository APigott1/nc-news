import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";
import getDateString from "../utils/getDateString";

const CommentInput = ({ getComments }) => {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [newComment, setNewComment] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setNewComment(() => {
      const createdAt = new Date();
      return {
        author: user.username,
        body: commentBody,
        votes: 0,
        created_at: createdAt,
      };
    });
    setCommentBody("");
    setIsPosting(true);
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username, body: commentBody }),
      }
    )
      .then((res) => {
        setError(null);
        setIsPosting(false);

        if (res.ok) return res.json();
        else return Promise.reject(res);
      })
      .then((commentData) => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
        setError({ status: "postError", msg: "could not submit comment" });
        setNewComment(null);
      });
  };

  return (
    <>
      <li className="comment">
        <form action={handleSubmit}>
          <label htmlFor="comment">Comment:</label>
          <input
            id="comment"
            type="text"
            value={commentBody}
            onChange={(event) => {
              setCommentBody(event.target.value);
            }}
            required
          ></input>
          <button type="submit">submit</button>
        </form>
      </li>
      {isPosting && <p>posting your comment...</p>}
      {error && <p>Error: {error.msg}</p>}
      {!error && newComment && (
        <li className="comment">
          <p>Author: {newComment.author}</p>
          <p>Comment: {newComment.body}</p>
          <p>Votes: {newComment.votes}</p>
          <p>Commented: {getDateString(newComment)}</p>
        </li>
      )}
    </>
  );
};

export default CommentInput;
