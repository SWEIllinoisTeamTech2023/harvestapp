import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../styles/simulate.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Piechart from "../components/piechart";
import Linegraph from "../components/linegraph";

const Simulate = () => {
  const { state } = useLocation();
  const [user, setUser] = useState();
  const [costData, setCostData] = useState();
  const [openSaveSim, setOpenSaveSim] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [simName, setSimName] = useState("");
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
        // console.log("in fetchUser: ", user.attributes.email);
        setUser("Test User");
      })
      .catch((err) => console.log(err));
  }

  const handleVariablesChange = (e) => {
    setInputVars((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //edit simulation --> call model file again
  const handleSaveVariables = () => {
    console.log("in handleVariableChange: ");
    console.log(inputVars);
  };

  const handleNameChange = (event) => {
    setSimName(event.target.value);
  };

  const handleOpenSaveSim = () => {
    setOpenSaveSim(true);
  };

  const handleSaveSim = (event) => {
    event.preventDefault();
    console.log("in savesimulation: ", simName);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    console.log("costdata: ", costData)
    //add inputId
    const param = {
      // user: user.attributes.email,
      user: "test@gmail.com",
      name: simName,
      crop_type: state["data"]["crop_type"],
      machine_type: state["data"]["machine_type"],
      input_id: state["data"]["input_id"],
      total_costofharvest: costData[0][5].doubleValue,
      date: dateTime,
      chafferClear: inputVars.chafferClear,
      concaveClear: inputVars.concaveClear,
      sieveClear: inputVars.sieveClear,
      speed: inputVars.speed,
      fanSpeed: inputVars.fanSpeed,
      rotorSpeed: inputVars.rotorSpeed,
    };
    console.log("Param: ", param);
    fetch("/saveSimulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("IN DATAT: ", data.message);
      })
      .catch((error) => {
        console.log("IN ERROR");
        console.error("Error:", error);
      });
      setOpenSaveSim(false);
  };

  const getCost = async () => {
    console.log("here in getCost");
    // console.log("state: ", state)
    // console.log("inputid: ", state['data']['input_id'])
    // setIsLoading(true);
    const response = await fetch(
      "/getCostDistribution?input_id=" + state["data"]["input_id"],
      {
        method: "GET",
      }
    );
    const responseRec = await response.json();
    console.log("responseRec: ", responseRec);
    setCostData(responseRec);
    setIsLoading(false);
  };

  useEffect(() => {
    // fetchUser();
    console.log("loading: ", isLoading);
    getCost();
    console.log("after loading: ", isLoading);
  }, [isLoading]);

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
              name="chafferClear"
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
              name="concaveClear"
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
              name="sieveClear"
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
              name="speed"
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
              name="fanSpeed"
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
              name="rotorSpeed"
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
              onClick={() => handleOpenSaveSim()}
            >
              Save Simulation
            </button>
          </div>
          <div class="display-simulation">
            <h2>Cost Distribution</h2>
            {!isLoading && <Piechart data={costData} />}
          </div>
        </div>
        <Dialog
          className="saveName"
          open={openSaveSim}
          fullWidth
          onClose={() => setOpenSaveSim(false)}
          maxWidth="sm"
          PaperProps={{
            style: {
              maxWidth: "40%",
              minHeight: "35%",
              maxHeight: "35%",
              border: "2px",
              borderRadius: "30px",
              paddingLeft: "8px",
              paddingRight: "30px",
              paddingBottom: "10px",
            },
          }}
        >
          <DialogTitle sx={{ fontSize: "30px", fontWeight: "bold" }}>
            Save Simulation
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: "10%" }}>
              Please enter the name of this simulation
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              id="name"
              label="Name"
              type="text"
              variant="standard"
              sx={{ fontSize: "50px" }}
              onChange={handleNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveSim}>Save Simulation</Button>
            <Button onClick={() => setOpenSaveSim(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>

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
