import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, addArticle }  from "../../redux/modules/articles/action-creators";
import Article from "./Article";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const ArticleList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    axios.get(apiUrl).then((response) => {
      dispatch(getArticles(response.data));
    });
  }, [dispatch]);

  const articles = useSelector((state) => state.articles);

  const [articlesCount, setArticlesCount] = useState(3);

  const [newArticle, setNewArticle] = useState({});

  const handleInputArticleTitle = useCallback((value) => {
    setNewArticle({
      ...newArticle, id: articles.length + 1, title: value 
    })
  }, [articles.length, newArticle])

  const handleInputArticleBody = useCallback((value) => {
    setNewArticle({
      ...newArticle, body: value
    })
  }, [newArticle])

  const handleAddArticle = useCallback(() => {
    dispatch(addArticle(newArticle))
    setShowCreateModal(false)
  }, [dispatch, newArticle])

  const [smallCard, setSmallCard] = useState(true);

  const [showMoreButton, setShowMoreButton] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

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
      setArticlesCount(articles.length);
      setShowMoreButton(false);
    } else {
      setArticlesCount(articlesCount + 3);
    }
  }, [articles.length, articlesCount]);

  return (
    <>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col d-flex">
            <h2>Articles List</h2>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary ml-3">Add new article</button>
          </div>
          <div className="col">
            <div className="float-right">
              <button
                className="btn btn-outline-primary"
                onClick={() => setSmallCard(!smallCard)}
              >
                {smallCard ? "Make big cards" : "Make small cards"}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {newArticles.length > 0 &&
            newArticles.map((article) => (
              <Article
                key={article.id}
                article={article}
                smallCard={smallCard}
              />
            ))}
        </div>
        {showMoreButton && (
          <div className="row">
            <div className="col">
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Article Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputArticleTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Article Body
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => handleInputArticleBody(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddArticle}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ArticleList;
