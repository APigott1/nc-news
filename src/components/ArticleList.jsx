import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import ArticleBasic from "./ArticleBasic";

const ArticleList = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let url = "https://nc-news-backend-sgvu.onrender.com/api/articles";

  if (slug) {
    url += `?topic=${slug}`;
  }

  useEffect(() => {
    fetch(url)
      .then((res) => {
        setError(null);
        if (res.ok) return res.json();
        else return Promise.reject(res);
      })
      .then((articlesData) => {
        setArticles(articlesData.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError({
          status: "error",
          msg: "could not find what you were looking for.",
        });
      });
  }, [url]);

  if (error) {
    return (
      <>
        <FilterBar />
        <h2>{error.msg}</h2>
      </>
    );
  }

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
