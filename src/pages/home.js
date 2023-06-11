import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/home.css";
import Navbar from "../components/navbar";

const Home = ({ route }) => {
  console.log("this is uuse in home: ", route.params.user);
  return (
    <div className="Home" id="Home">
      <Header title="Home"></Header>
    </div>
  );
};

export default Home;
