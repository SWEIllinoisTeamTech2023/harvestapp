import React from "react";
import { Link } from "react-router-dom";

const Simulate = () => {
  return (
    <div>
      <h1>Simulation here</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Simulate;
