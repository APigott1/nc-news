import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import Article from "./components/Article";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
