import React from "react";
import Hamburger from "hamburger-react";
import { useState } from "react";
import logo from "../images/logo.png";
import Navbar from "./navbar";
import "../styles/header.css";

function Header(props) {
  return (
    <div className="Header">
      <Navbar />
      <h1>{props.title}</h1>
      <img src={logo} width={100} height={100} alt="Logo"></img>
    </div>
  );
}

export default Header;
