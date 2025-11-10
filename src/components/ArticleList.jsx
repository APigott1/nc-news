import { useState, useEffect } from "react";
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
        <ul>
          {console.log(articles)}
          {articles.map((article) => (
            <ArticleBasic key={article.article_id} article={article} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ArticleList;
