import getDateString from "../utils/getDateString";

const ArticleBasic = ({ article }) => {
  return (
    <li className="article-basic">
      <h2 className="article-title">{article.title}</h2>

      <div className="article-contents">
        <img
          className="article-img"
          src={article.article_img_url}
          alt={`${article.title}`}
        />

        <div className="article-info">
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
          <p>Published: {getDateString(article)}</p>
        </div>
      </div>
    </li>
  );
};

export default ArticleBasic;
