import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);

  const createdAt = new Date(article.created_at);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
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
  if (isLoadingArticle) return <p>Loading...</p>;
  return (
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
      <p>Comments: {article.comment_count}</p>
      <p>Published: {createdAt.toLocaleDateString(undefined, options)}</p>
    </div>
  );
};

export default Article;
