import React, { useCallback, useState } from "react";
import axios from "axios";
import selectPhoto from "../../redux/actions/photos/selectPhoto";
import { useDispatch } from "react-redux";
import "./style.css";
import delPhoto from "../../redux/actions/photos/delPhoto";
import { Button, Modal } from "react-bootstrap";
import editPhoto from "../../redux/actions/photos/editPhoto";

const Photo = ({ photo, smallCard }) => {
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

  const handlePhotoDetail = useCallback(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${photo.id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(selectPhoto(response.data));
      });
    handleShow();
  }, [photo.id, dispatch]);

  const handleDeletePhoto = (id) => {
    dispatch(delPhoto(id));
    setShowDelModal(false);
  };

  const [photoTitle, setPhotoTitle] = useState(photo.title);

  const [photoUrl, setPhotoBody] = useState(photo.url);

  const handleInputPhotoTitleEdit = useCallback((value) => {
    setPhotoTitle(value);
  }, []);

  const handleInputPhotoBodyEdit = useCallback((value) => {
    setPhotoBody(value);
  }, []);

  const handleEditPhoto = useCallback(
    (photo) => {
      let editedPhoto = {
        ...photo,
        title: photoTitle,
        url: photoUrl,
      };
      dispatch(editPhoto(editedPhoto));
      setShowEditModal(false);
      console.log(editedPhoto);
    },
    [photoUrl, photoTitle, dispatch]
  );

  return (
    <div className={`col-sm-12 mt-3 ${smallCard ? "col-md-4" : "col-md-6"}`}>
      <div className="card">
        <div className={`card-body style_${style}`}>
          <img className="card-img-top" src={photo.url} alt="" />
          <h5 className="card-title mt-2">
            {photo.title.length > 20
              ? photo.title.substr(0, 20) + "..."
              : photo.title}
          </h5>
          <div className="btn-group d-flex justify-content-center">
            <button
              onClick={() => handlePhotoDetail(photo.id)}
              className="btn btn-outline-primary"
            >
              View
            </button>
            <button
              onClick={() => handleEditModalShow(photo.id)}
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
          <Button variant="danger" onClick={() => handleDeletePhoto(photo.id)}>
            Yes
          </Button>
          <Button variant="success" onClick={() => setShowDelModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDetailModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Photo Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{photo.title}</h4>
          <img className="card-img-top" src={photo.url} alt=""/>
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Photo Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputPhotoTitleEdit(e.target.value)}
              value={photoTitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Photo Url
            </label>
            <input
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => handleInputPhotoBodyEdit(e.target.value)}
              value={photoUrl}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleEditPhoto(photo)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Photo;
