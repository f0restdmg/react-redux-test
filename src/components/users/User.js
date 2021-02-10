import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { delUser, editUser } from "../../redux/modules/users/action-creators";
import { Button, Modal } from "react-bootstrap";

const User = ({ user, smallCard }) => {
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

  const handleUserDetail = useCallback(() => {
    handleShow();
  }, []);

  const handleDeleteUser = (id) => {
    dispatch(delUser(id));
    setShowDelModal(false);
  };

  const [userName, setUserName] = useState(user.name);

  const [userEmail, setUserEmail] = useState(user.email);

  const [userPhone, setUserPhone] = useState(user.phone);

  const [username, setUserUsername] = useState(user.username);

  const [userWebsite, setUserWebsite] = useState(user.website);

  const handleInputUserNameEdit = useCallback((value) => {
    setUserName(value);
  }, []);

  const handleInputUserEmailEdit = useCallback((value) => {
    setUserEmail(value);
  }, []);

  const handleInputUserPhoneEdit = useCallback((value) => {
    setUserPhone(value);
  }, []);

  const handleInputUserUsernameEdit = useCallback((value) => {
    setUserUsername(value);
  }, []);

  const handleInputUserWebsiteEdit = useCallback((value) => {
    setUserWebsite(value);
  }, []);

  const handleEditUser = useCallback(
    (user) => {
      let editedUser = {
        ...user,
        name: userName,
        email: userEmail,
        phone: userPhone,
        username: username,
        website: userWebsite
      };
      dispatch(editUser(editedUser));
      setShowEditModal(false);
      console.log(editedUser);
    },
    [userName, userEmail, userPhone, username, userWebsite, dispatch]
  );

  return (
    <div className={`col-sm-12 mt-3 ${smallCard ? "col-md-4" : "col-md-6"}`}>
      <div className="card">
        <div className={`card-body style_${style}`}>
          <h5 className="card-title">{user.name}</h5>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">{`email: ${user.email}`}</li>
            <li className="list-group-item">{`phone: ${user.phone}`}</li>
          </ul>
          <div className="btn-group d-flex justify-content-center">
            <button
              onClick={() => handleUserDetail(user.id)}
              className="btn btn-outline-primary"
            >
              View
            </button>
            <button
              onClick={() => handleEditModalShow(user.id)}
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
          <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
            Yes
          </Button>
          <Button variant="success" onClick={() => setShowDelModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDetailModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{user.name}</h4>
          <ul class="list-group list-group-flush mb-3">
            <li className="list-group-item">{`email: ${user.email}`}</li>
            <li className="list-group-item">{`phone: ${user.phone}`}</li>
            <li className="list-group-item">{`username: ${user.username}`}</li>
            <li className="list-group-item">{`website: ${user.website}`}</li>
          </ul>
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
              onChange={(e) => handleInputUserNameEdit(e.target.value)}
              value={userName}
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
              onChange={(e) => handleInputUserEmailEdit(e.target.value)}
              value={userEmail}
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
              onChange={(e) => handleInputUserPhoneEdit(e.target.value)}
              value={userPhone}
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
              onChange={(e) => handleInputUserUsernameEdit(e.target.value)}
              value={username}
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
              onChange={(e) => handleInputUserWebsiteEdit(e.target.value)}
              value={userWebsite}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleEditUser(user)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
