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
    //input name of simulation
    //write to rds the simulation data which is saved
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
            <TextField
              InputProps={{
                style: {
                  borderRadius: "15px",
                  height: "50px",
                  marginBottom: "12px",
                },
              }}
              id="outlined-basic"
              className="inputBoxNext"
              type="number"
              label="Chaffer Clearance"
              variant="outlined"
              value={inputVars.chafferClear}
              onChange={handleVariablesChange}
            />
            <TextField
              InputProps={{
                style: {
                  borderRadius: "15px",
                  height: "50px",
                  marginBottom: "12px",
                },
              }}
              id="outlined-basic"
              className="inputBoxNext"
              type="number"
              label="Concave Clearance"
              variant="outlined"
              value={inputVars.concaveClear}
              onChange={handleVariablesChange}
            />
            <TextField
              InputProps={{
                style: {
                  borderRadius: "15px",
                  height: "50px",
                  marginBottom: "12px",
                },
              }}
              id="outlined-basic"
              className="inputBoxNext"
              type="number"
              label="Sieve Clearance"
              variant="outlined"
              value={inputVars.sieveClear}
              onChange={handleVariablesChange}
            />
            <TextField
              InputProps={{
                style: {
                  borderRadius: "15px",
                  height: "50px",
                  marginBottom: "12px",
                },
              }}
              id="outlined-basic"
              className="inputBoxNext"
              type="number"
              label="Speed"
              variant="outlined"
              value={inputVars.speed}
              onChange={handleVariablesChange}
            />
            <TextField
              InputProps={{
                style: {
                  borderRadius: "15px",
                  height: "50px",
                  marginBottom: "12px",
                },
              }}
              id="outlined-basic"
              className="inputBoxNext"
              type="number"
              label="Fan Speed"
              variant="outlined"
              value={inputVars.fanSpeed}
              onChange={handleVariablesChange}
            />
            <TextField
              InputProps={{
                style: {
                  borderRadius: "15px",
                  height: "50px",
                },
              }}
              id="outlined-basic"
              className="inputBoxNext"
              type="number"
              label="Rotor Speed"
              variant="outlined"
              value={inputVars.rotorSpeed}
              onChange={handleVariablesChange}
            />
            <button
              className="button"
              type="submit"
              style={{ marginTop: "8px" }}
              onClick={() => handleSaveVariables()}
            >
              Edit Simulation
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
