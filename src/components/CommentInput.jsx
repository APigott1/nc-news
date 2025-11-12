import { useState } from "react";
import { useParams } from "react-router-dom";

const CommentInput = () => {
  const { article_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [newComments, setNewComments] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const handleSubmit = () => {
    setNewComments((curComments) => {
      const createdAt = new Date();
      return [
        {
          author: "grumpy19",
          body: commentBody,
          votes: 0,
          created_at: createdAt,
        },
        ...curComments,
      ];
    });
    setCommentBody("");
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "grumpy19", body: commentBody }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(res);
      })
      .catch((error) => {
        setError({ status: "postError", msg: "could not submit comment" });
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
      {error && <p>Error: {error.msg}</p>}
      {!error &&
        newComments.length > 0 &&
        newComments.map((comment, index) => {
          return (
            <li key={index} className="comment">
              <p>Author: {comment.author}</p>
              <p>Comment: {comment.body}</p>
              <p>Votes: {comment.votes}</p>
              <p>
                Commented:
                {comment.created_at.toLocaleDateString(undefined, options)}
              </p>
            </li>
          );
        })}
    </>
  );
};

export default CommentInput;
