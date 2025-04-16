import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import Login from "../components/Login/Login";

const LoginPage = () => {
  return (
    <>
      <Navbar session={false} />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
