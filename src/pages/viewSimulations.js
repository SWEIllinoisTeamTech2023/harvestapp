import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/viewsimulations.css";
import SavedSim from "../components/savedsim";

const ViewSimulations = () => {
  const [user, setUser] = useState("test@gmail.com");
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
    const param = {
      user: user,
    };
    console.log("IN fetch data: ", param);
    fetch("/getSavedSimulations", {
      method: "GET",
    })
      .then((response) => {
        response.json();
        // console.log("response.json ", message["records"]);
        // console.log("user: ", message.user);
      })
      .then((data) => {
        console.log("message: ", data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // var data = {
    //   date: "07/25/2023",
    //   id: "123467",
    //   name: "Harvest Operation #1",
    //   cropType: "Corn",
    //   machineType: "X-Series",
    //   inputVar: {
    //     chafferClear: 10,
    //     concaveClear: 10,
    //     sieveClear: 10,
    //     speed: 10,
    //     fanSpeed: 10,
    //     rotorSpeed: 10,
    //   },
    // };

    // setCardData(data);
    // console.log("IN FETCHDATA: ", cardData);
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
          {/* <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim>
          <SavedSim cardData={cardData}></SavedSim> */}
        </div>
      </div>
    )
  );
};

export default ViewSimulations;
