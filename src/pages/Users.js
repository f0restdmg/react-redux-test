import React from "react";
import UserList from "../components/users/UserList";
import MainWrapper from "../containers/MainWrapper";

const Users = () => {
  return (
    <>
      <MainWrapper>
        <UserList />
      </MainWrapper>
    </>
  );
};

export default Users;