import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import getPhotos from "../../redux/actions/photos/getPhotos";
import Photo from "./Photo";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import addPhoto from "../../redux/actions/photos/addPhoto";

const PhotoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/photos";
    axios.get(apiUrl).then((response) => {
      dispatch(getPhotos(response.data));
    });
  }, [dispatch]);

  const photos = useSelector((state) => state.photos);

  const [photosCount, setPhotosCount] = useState(3);

  const [newPhoto, setNewPhoto] = useState({});

  const handleInputPhotoTitle = useCallback((value) => {
    setNewPhoto({
      ...newPhoto, id: photos.length + 1, title: value 
    })
  }, [photos.length, newPhoto])

  const handleInputPhotoUrl = useCallback((value) => {
    setNewPhoto({
      ...newPhoto, url: value
    })
  }, [newPhoto])

  const handleAddPhoto = useCallback(() => {
    dispatch(addPhoto(newPhoto))
    setShowCreateModal(false)
  }, [dispatch, newPhoto])

  const [smallCard, setSmallCard] = useState(true);

  const [showMoreButton, setShowMoreButton] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  let newPhotos = [];

  let counter = 1;

  for (let newPhoto of photos) {
    if (counter > photosCount) break;
    newPhotos.push(newPhoto);
    counter++;
  }

  const handleShowMore = useCallback(() => {
    let lastCount = photosCount + 3;
    if (lastCount > photos.length) {
      setPhotosCount(photos.length);
      setShowMoreButton(false);
    } else {
      setPhotosCount(photosCount + 3);
    }
  }, [photos.length, photosCount]);

  return (
    <>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col d-flex">
            <h2>Photos List</h2>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary ml-3">Add new photo</button>
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
          {newPhotos.length > 0 &&
            newPhotos.map((photo) => (
              <Photo
                key={photo.id}
                photo={photo}
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
          <Modal.Title>Add photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputPhotoTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Img url
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputPhotoUrl(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddPhoto}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhotoList;
