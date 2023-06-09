import React from "react";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  //   const [isOpen, setOpen] = useState(false);

  return (
    <div className="NavBar" id="NavBar">
      <div className="MenuLogo" id="MenuLogo">
        <Hamburger
          onToggle={(toggled) => {
            if (toggled) {
              openMenu();
            } else {
              closeMenu();
            }
          }}
        />
      </div>
      <div className="NavMenu" id="NavMenu">
        <button className="NavButton" style={{ marginTop: "15%" }}>
          Input
        </button>
        <button className="NavButton">Simulate</button>
        <button className="NavButton">View Saved Simulations</button>
      </div>
    </div>
  );
}

function openMenu() {
  document.getElementById("NavMenu").style.visibility = "visible";
  document.getElementById("NavMenu").style.width = "15%";
  document.getElementById("MenuLogo").style.marginLeft = "10%";
}

function closeMenu() {
  document.getElementById("NavMenu").style.visibility = "hidden";
  document.getElementById("NavMenu").style.width = "15%";
  document.getElementById("Home").style.marginLeft = "0%";
  document.getElementById("MenuLogo").style.marginLeft = "0%";
}

export default Navbar;
