import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser } from "../../redux/modules/users/action-creators";
import User from "./User";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    axios.get(apiUrl).then((response) => {
      dispatch(getUsers(response.data));
    });
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  const [usersCount, setUsersCount] = useState(3);

  const [newUser, setNewUser] = useState({});

  const handleInputUserName = useCallback((value) => {
    setNewUser({
      ...newUser, id: users.length + 1, name: value 
    })
  }, [users.length, newUser])

  const handleInputUserEmail = useCallback((value) => {
    setNewUser({
      ...newUser, email: value
    })
  }, [newUser])

  const handleInputUserPhone = useCallback((value) => {
    setNewUser({
      ...newUser, phone: value
    })
  }, [newUser])

  const handleInputUserUsername = useCallback((value) => {
    setNewUser({
      ...newUser, username: value
    })
  }, [newUser])

  const handleInputUserWebsite = useCallback((value) => {
    setNewUser({
      ...newUser, website: value
    })
  }, [newUser])

  const handleAddUser = useCallback(() => {
    dispatch(addUser(newUser))
    setShowCreateModal(false)
  }, [dispatch, newUser])

  const [smallCard, setSmallCard] = useState(true);

  const [showMoreButton, setShowMoreButton] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  let newUsers = [];

  let counter = 1;

  for (let newUser of users) {
    if (counter > usersCount) break;
    newUsers.push(newUser);
    counter++;
  }

  const handleShowMore = useCallback(() => {
    let lastCount = usersCount + 3;
    if (lastCount > users.length) {
      setUsersCount(users.length);
      setShowMoreButton(false);
    } else {
      setUsersCount(usersCount + 3);
    }
  }, [users.length, usersCount]);

  return (
    <>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col d-flex">
            <h2>Users List</h2>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary ml-3">Add new user</button>
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
          {newUsers.length > 0 &&
            newUsers.map((user) => (
              <User
                key={user.id}
                user={user}
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
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              User Email
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              User Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputUserPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              User username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputUserUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              User website
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => handleInputUserWebsite(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddUser}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
