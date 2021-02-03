import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import getArticles from "../../redux/actions/getArticles";
import Article from "./Article";

const ArticleList = ({ articles }) => {
  const dispatch = useDispatch();

  const [articlesCount, setArticlesCount] = useState(3);

  const [showMoreButton, setShowMoreButton] = useState(true);

  let newArticles = [];

  let counter = 1;

  for (let newArticle of articles) {
    if (counter > articlesCount) break;
    newArticles.push(newArticle);
    counter++;
  }

  const handleShowMore = useCallback(() => {
    let lastCount = articlesCount + 3;
    if (lastCount > articles.length) {
      setArticlesCount(articles.length)
      setShowMoreButton(false);
    } else {
      setArticlesCount(articlesCount + 3);
    }  
  }, [articles.length, articlesCount]);

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    axios.get(apiUrl).then((response) => {
      dispatch(getArticles(response.data));
    });
  }, [dispatch]);

  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col">
          <h2>Articles List</h2>
        </div>
        <div className="col">
          <div className="float-right">
            <button className="btn btn-outline-dark">Make big cards</button>
          </div>
        </div>
      </div>
      <div className="row">
        {newArticles.length > 0 &&
          newArticles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </div>
      {showMoreButton && (
        <div className="row">
          <div className="col">
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-dark btn-lg"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles,
});

export default connect(mapStateToProps)(ArticleList);
