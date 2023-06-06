import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/home.css";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="Home">
      <Header title="Home"></Header>
      {/* <Link to="/signup">
        <button>Create a new account</button>
    </Link>
    <Link to="/login">
        <button>Login</button>
    </Link>
    <Link to="/inputdata">
        <button>Input Data</button>
    </Link>
    <Link to="/simulate">
        <button>Simulate</button>
    </Link> */}
    </div>
  );
};

export default Home;
