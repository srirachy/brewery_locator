import React from "react";
import { Outlet } from "react-router-dom";
import GlobalStyle from "../utils/globalStyle";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;