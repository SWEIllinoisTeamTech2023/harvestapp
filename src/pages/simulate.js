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
  const [inputVars, setInputVars] = useState({
    chafferClear: null,
    concaveClear: null,
    sieveClear: null,
    speed: null,
    fanSpeed: null,
    rotorSpeed: null,
  });

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

  const handleVariablesChange = (e) => {
    setInputVars((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log("in handleVariableChange: ");
    // console.log(inputVars);
  };

  const handleSaveVariables = () => {
    console.log("in handleVariableChange: ");
    console.log(inputVars);
  };

  const handleSaveSim = () => {
    console.log("in savesimulation");
  };

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
              value={inputVars.chafferClear}
              name="chafferClear"
              onChange={handleVariablesChange}
              min="0"
              placeholder="Chaffer Clearance"
            />
            <input
              className="inputBox"
              type="number"
              value={inputVars.concaveClear}
              name="concaveClear"
              onChange={handleVariablesChange}
              min="0"
              placeholder="Concave Clearance"
            />
            <input
              className="inputBox"
              type="number"
              value={inputVars.sieveClear}
              name="sieveClear"
              onChange={handleVariablesChange}
              min="0"
              placeholder="Sieve Clearance"
            />
            <input
              className="inputBox"
              type="number"
              value={inputVars.speed}
              name="speed"
              onChange={handleVariablesChange}
              min="0"
              placeholder="Speed"
            />
            <input
              className="inputBox"
              type="number"
              value={inputVars.fanSpeed}
              name="fanSpeed"
              onChange={handleVariablesChange}
              min="0"
              placeholder="Fan Speed"
            />
            <input
              className="inputBox"
              type="number"
              value={inputVars.rotorSpeed}
              name="rotorSpeed"
              onChange={handleVariablesChange}
              min="0"
              placeholder="Rotor Speed"
            />
            <button
              className="button"
              type="submit"
              style={{ marginTop: "30px" }}
              onClick={() => handleSaveVariables()}
            >
              Save Changes
            </button>
            <button className="button" type="submit">
              Copy Optimal Values
            </button>
            <button
              className="button"
              type="submit"
              onClick={() => handleSaveSim}
            >
              Save Simulation
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
