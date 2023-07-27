import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/viewsimulations.css";
import SavedSim from "../components/savedsim";

//condensed version
//date
//name
//crop type
//machine type

//full version
//condensed version +
//all input variables
//pie chart (maybe view in simulate button)

const ViewSimulations = () => {
  const [user, setUser] = useState();
  const [cardData, setCardData] = useState({
    date: null,
    id: null,
    name: null,
    cropType: null,
    machineType: null,
    inputVar: null,
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

  async function fetchData() {
    var data = {
      date: "07/25/2023",
      id: "123467",
      name: "Harvest Operation #1",
      cropType: "Corn",
      machineType: "X-Series",
      inputVar: {
        chafferClear: 10,
        concaveClear: 10,
        sieveClear: 10,
        speed: 10,
        fanSpeed: 10,
        rotorSpeed: 10,
      },
    };

    setCardData(data);
    console.log("IN FETCHDATA: ", cardData);
  }

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return (
    console.log("IN return: ", cardData),
    (
      <div>
        <Header title="View Saved Simulations"></Header>
        <div class="view-parent">
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
        </div>
      </div>
    )
  );
};

export default ViewSimulations;
