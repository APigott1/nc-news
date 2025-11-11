import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import ArticleBasic from "./ArticleBasic";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://nc-news-backend-sgvu.onrender.com/api/articles")
      .then((res) => res.json())
      .then((articlesData) => {
        setArticles(articlesData.articles);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <FilterBar />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul className="articles-list">
          {articles.map((article) => (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
            >
              <ArticleBasic article={article} />
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default ArticleList;
