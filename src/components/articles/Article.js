import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { delArticle, editArticle } from "../../redux/modules/articles/action-creators";
import { Button, Modal } from "react-bootstrap";

const Article = ({ article, smallCard }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditModalShow = useCallback((id) => {
    setShowEditModal(true);
  }, []);

  const handleClose = () => {
    setShowDetailModal(false);
  };
  const handleShow = () => setShowDetailModal(true);

  const dispatch = useDispatch();

  const [showDelModal, setShowDelModal] = useState(false);

  const [style, setStyle] = useState(0);

  const handleChangeStyle = useCallback(() => {
    return style > 3 ? setStyle(1) : setStyle(style + 1);
  }, [style]);

  const handleArticleDetail = useCallback(() => {
    handleShow();
  }, []);

  const handleDeleteArticle = (id) => {
    dispatch(delArticle(id));
    setShowDelModal(false);
  };

  const [articleTitle, setArticleTitle] = useState(article.title)

  const [articleBody, setArticleBody] = useState(article.body)

  const handleInputArticleTitleEdit = useCallback((value) => {
    setArticleTitle(value);
  }, []);

  const handleInputArticleBodyEdit = useCallback((value) => {
    setArticleBody(value);
  }, []);

  const handleEditArticle = useCallback(article => {
    let editedArticle = {
      ...article, title: articleTitle, body: articleBody 
    }
    dispatch(editArticle(editedArticle))
    setShowEditModal(false)
  }, [articleBody, articleTitle, dispatch])

  return (
    <div className={`col-sm-12 mt-3 ${smallCard ? "col-md-4" : "col-md-6"}`}>
      <div className="card">
        <div className={`card-body style_${style}`}>
          <h5 className="card-title">
            {article.title.length > 20
              ? article.title.substr(0, 20) + "..."
              : article.title}
          </h5>
          <p className="card-text">
            {article.body.length > 100
              ? article.body.substr(0, 100) + "..."
              : article.body}
          </p>
          <div className="btn-group d-flex justify-content-center">
            <button
              onClick={() => handleArticleDetail(article.id)}
              className="btn btn-outline-primary"
            >
              View
            </button>
            <button
              onClick={() => handleEditModalShow(article.id)}
              className="btn btn-outline-primary"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDelModal(true)}
              className="btn btn-outline-primary"
            >
              Delete
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleChangeStyle}
            >
              Change color
            </button>
          </div>
        </div>
      </div>
      <Modal show={showDelModal} onHide={() => setShowDelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Attention!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this card?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handleDeleteArticle(article.id)}
          >
            Yes
          </Button>
          <Button variant="success" onClick={() => setShowDelModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDetailModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Article Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{article.title}</h4>
          {article.body}
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit article</Modal.Title>
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
              onChange={(e) => handleInputArticleTitleEdit(e.target.value)}
              value={articleTitle}
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
              onChange={(e) => handleInputArticleBodyEdit(e.target.value)}
              value={articleBody}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="success"
            onClick={() => handleEditArticle(article)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Article;
