import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "./CommentList";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(0); // 0 represents not requested, 1 represents requested but not loaded, -1 represents loaded
  const [comments, setComments] = useState([]);

  const createdAt = new Date(article.created_at);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const handleClick = () => {
    setIsLoadingComments(1);
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => res.json())
      .then((commentsData) => {
        setIsLoadingComments(-1);
        setComments(commentsData.comments);
      });
  };

  useEffect(() => {
    fetch(
      `https://nc-news-backend-sgvu.onrender.com/api/articles/${article_id}`
    )
      .then((res) => res.json())
      .then((articleData) => {
        setIsLoadingArticle(false);
        setArticle(articleData.article);
      });
  }, []);

  if (isLoadingArticle) return <p>Loading article...</p>;

  return (
    <div>
      <div className="article">
        <h2>{article.title}</h2>

        <img
          className="article-img"
          src={article.article_img_url}
          alt={`${article.title}`}
        />

        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Body: {article.body}</p>
        <p>Votes: {article.votes}</p>
        <Link>
          <p onClick={handleClick}>Comments: {article.comment_count}</p>
        </Link>
        <p>Published: {createdAt.toLocaleDateString(undefined, options)}</p>
      </div>
      {isLoadingComments === 1 && <p>Loading comments...</p>}
      {isLoadingComments === -1 && <CommentList comments={comments} />}
    </div>
  );
};

export default Article;
