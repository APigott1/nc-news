import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FilterBar = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedSort, setSelectedSort] = useState("date");
  const [selectedOrder, setSelectedOrder] = useState("desc");
  const [ascText, setAscText] = useState("oldest first");
  const [descText, setDescText] = useState("most recent first");

  useEffect(() => {
    if (selectedSort === "date") {
      setAscText("oldest");
      setDescText("most recent");
    } else {
      setAscText("least");
      setDescText("most");
    }
  }, [selectedSort]);

  useEffect(() => {
    if (slug) {
      setSelectedTopic(slug);
    } else {
      setSelectedTopic("all");
    }
  }, [slug]);

  useEffect(() => {
    fetch("https://nc-news-backend-sgvu.onrender.com/api/topics")
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(res);
      })
      .then((topicsData) => {
        setTopics(topicsData.topics);
      });
  }, []);

  useEffect(() => {
    if (selectedTopic !== "all") {
      navigate(`/topics/${selectedTopic}`);
    } else {
      navigate("/");
    }
  }, [selectedTopic]);

  useEffect(() => {
    const queries = [];
    let queryStr = "";
    if (selectedSort !== "date") {
      queries.push(`sort_by=${selectedSort}`);
    }
    if (selectedOrder !== "desc") {
      queries.push(`order=${selectedOrder}`);
    }

    if (queries.length > 0) {
      queryStr = "?" + queries.join("&");
    }
    navigate(queryStr);
  }, [selectedOrder, selectedSort]);

  return (
    <div className="filter">
      <div className="field">
        <label htmlFor="topics">Topics: </label>
        <select
          id="topics"
          value={selectedTopic}
          onChange={(event) => {
            setSelectedTopic(event.target.value);
          }}
        >
          <option value="all">all</option>
          {topics.length > 0 &&
            topics.map((topics) => (
              <option key={topics.slug} value={topics.slug}>
                {topics.slug}
              </option>
            ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort-by">Sort by: </label>
        <select
          id="sort-by"
          value={selectedSort}
          onInput={(event) => {
            setSelectedSort(event.target.value);
          }}
        >
          <option value="date">date</option>
          <option value="comment_count">comment count</option>
          <option value="votes">votes</option>
        </select>
      </div>

      <div className="field">
        <input
          type="radio"
          id="asc"
          name="order"
          value="asc"
          checked={selectedOrder === "asc"}
          onChange={(event) => setSelectedOrder(event.target.value)}
        ></input>
        <label htmlFor="asc">{ascText}</label>
        <input
          type="radio"
          id="desc"
          name="order"
          value="desc"
          checked={selectedOrder === "desc"}
          onChange={(event) => setSelectedOrder(event.target.value)}
        ></input>
        <label htmlFor="desc">{descText}</label>
      </div>
    </div>
  );
};

export default FilterBar;
