import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../styles/home.css";
import Navbar from "../components/navbar";

const Home = () => {
  const location = useLocation();
  const user = location.state.user;
  console.log("this is uuse in home: ", user);
  return (
    <div className="Home" id="Home">
      <Header title="Home"></Header>
    </div>
  );
};

export default Home;
