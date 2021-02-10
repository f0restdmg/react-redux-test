import React from "react";
import PhotoList from "../components/photos/PhotoList";
import MainWrapper from "../containers/MainWrapper";

const Photos = () => {
  return (
    <>
      <MainWrapper>
        <PhotoList />
      </MainWrapper>
    </>
  );
};

export default Photos;