import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/simulate.css";
import { TextField } from "@mui/material";
import Piechart from "../components/piechart";
import Linegraph from "../components/linegraph";

const Simulate = () => {
  const [user, setUser] = useState();

  async function fetchUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        console.log("in fetchUser: ", user.attributes.email);
        setUser(user);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header title="Simulate"></Header>
      <div class="simulate-parent">
        <div class="simulate-piechart">
          <div class="input-variables">
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Chaffer Clearance"
            />
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Concave Clearance"
            />
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Sieve Clearance"
            />
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Harvest Cost"
            />
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Speed"
            />
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Fan Speed"
            />
            <input
              className="inputBox"
              type="number"
              // value={yieldValue}
              // onChange={handleYieldChange}
              min="0"
              placeholder="Rotor Speed"
            />
            <button
              className="button"
              type="submit"
              style={{ marginTop: "30px" }}
            >
              Save Edited Variables
            </button>
            <button className="button" type="submit">
              Copy Optimized Variables
            </button>
          </div>
          <div class="display-simulation">
            <h2>Cost Distribution</h2>
            <Piechart />
          </div>
        </div>
        <div class="simulate-linegraph">
          <div class="display-simulation">
            <h2>Cost vs Feedrate</h2>
            <Linegraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulate;
