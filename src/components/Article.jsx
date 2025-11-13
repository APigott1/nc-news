import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "./CommentList";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(0); // 0 represents not requested, 1 represents requested but not loaded, -1 represents loaded
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [userLikes, setUserLikes] = useState(0);

  const createdAt = new Date(article.created_at);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(res);
      })
      .then((articleData) => {
        setIsLoadingArticle(false);
        setArticle(articleData.article);
      })
      .catch((error) => {
        setError({ status: "articleError", msg: "could not find article" });
      });
  }, []);

  const getComments = () => {
    setIsLoadingComments(1);
    return fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => res.json())
      .then((commentsData) => {
        setIsLoadingComments(-1);
        setComments(commentsData.comments);
      });
  };

  const handleVote = (vote) => {
    setUserLikes((curLikes) => curLikes + vote);
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inc_votes: vote }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(res);
      })
      .then((articleData) => {
        setArticle({
          comment_count: article.comment_count,
          ...articleData.article,
        });
        setUserLikes(0);
      })
      .catch((error) => {
        setError({ status: "voteError", msg: "voting not available" });
        setUserLikes(0);
      });
  };

  if (error && error.status === "articleError") {
    return <p>Error: {error.msg}</p>;
  }

  if (isLoadingArticle) return <p>Loading article...</p>;

  return (
    <article>
      <div className="article">
        <h2>{article.title}</h2>

        <img
          className="article-img"
          src={article.article_img_url}
          alt={`${article.title}`}
        />

        <p>Author: {article.author}</p>
        <Link to={`/topics/${article.topic}`}>
          <p>Topic: {article.topic}</p>
        </Link>
        <p>Body: {article.body}</p>
        <p>Votes: {article.votes + userLikes}</p>
        <Link>
          <p onClick={getComments}>Comments: {article.comment_count}</p>
        </Link>
        <p>Published: {createdAt.toLocaleDateString(undefined, options)}</p>
        <button
          onClick={() => {
            handleVote(1);
          }}
        >
          Like
        </button>
        <button
          onClick={() => {
            handleVote(-1);
          }}
        >
          Dislike
        </button>
        {error && error.status === "voteError" && <p>{error.msg}</p>}
      </div>
      {isLoadingComments === 1 && <p>Loading comments...</p>}
      {isLoadingComments === -1 && (
        <CommentList getComments={getComments} comments={comments} />
      )}
    </article>
  );
};

export default Article;
