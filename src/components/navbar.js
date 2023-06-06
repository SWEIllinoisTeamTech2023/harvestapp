import React from "react";
import Hamburger from "hamburger-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="NavBar">
      <Hamburger toggled={isOpen} toggle={setOpen} />
    </div>
  );
}

export default Navbar;
