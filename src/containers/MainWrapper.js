import React from "react";
import Header from "../components/Header";

const MainWrapper = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainWrapper;