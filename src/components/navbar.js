import React from "react";
import Hamburger from "hamburger-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="NavBar" id="NavBar1">
      <Hamburger
        onToggle={(toggled) => {
          if (toggled) {
            document.getElementById("NavMenu").style.visibility = "visible";
            console.log("open");
            // openMenu();
          } else {
            document.getElementById("NavMenu").style.visibility = "hidden";
            console.log("closed");
            // closeMenu();
          }
        }}
      />
      <section className="NavMenu" id="NavMenu"></section>
    </div>
  );
}

function openMenu() {
  console.log("hi");
}

function closeMenu() {
  console.log("bye");
  return (
    <div>
      <h1>close</h1>
    </div>
  );
}

export default Navbar;
