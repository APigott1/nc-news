import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterBar = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedSort, setSelectedSort] = useState("date");
  const [selectedOrder, setSelectedOrder] = useState("desc");

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

  const generateQuery = () => {
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
    console.log(queryStr);
    navigate(queryStr);
  };
  return (
    <>
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

      <form
        onSubmit={(event) => {
          event.preventDefault();
          generateQuery();
        }}
      >
        <label htmlFor="sort-by">Sort by: </label>
        <select
          id="sort-by"
          value={selectedSort}
          onChange={(event) => {
            setSelectedSort(event.target.value);
          }}
        >
          <option value="date">date</option>
          <option value="comment_count">comment count</option>
          <option value="votes">votes</option>
        </select>
        <input
          type="radio"
          id="asc"
          name="order"
          value="asc"
          onChange={(event) => setSelectedOrder(event.target.value)}
        ></input>
        <label htmlFor="asc">ascending</label>
        <input
          type="radio"
          id="desc"
          name="order"
          value="desc"
          onChange={(event) => setSelectedOrder(event.target.value)}
          defaultChecked
        ></input>
        <label htmlFor="desc">descending</label>
        <button>Submit Query</button>
      </form>
    </>
  );
};

export default FilterBar;
