import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/viewsimulations.css";
import SavedSim from "../components/savedsim";

const ViewSimulations = () => {
  const [user, setUser] = useState("test@gmail.com");
  const [cardData, setCardData] = useState([
    {
      inputId: null,
      id: null,
      name: null,
      date: null,
      cropType: null,
      machineType: null,
      inputVar: null,
    },
  ]);

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
    const response = await fetch("/getSavedSimulations", {
      method: "GET",
    });
    const responseRec = await response.json();
    console.log("responseRec: ", responseRec);
    var data = [];
    responseRec.forEach((element) => {
      console.log(element);
      var currData = {
        inputId: element[0].longValue,
        id: element[1].longValue,
        user: element[2].stringValue,
        name: element[3].stringValue,
        date: element[4].stringValue,
        cropType: element[5].stringValue,
        machineType: element[6].stringValue,
        inputVar: {
          rotorSpeed: element[7].longValue,
          fanSpeed: element[8].longValue,
          speed: element[9].longValue,
          sieveClear: element[10].longValue,
          concaveClear: element[11].longValue,
          chafferClear: element[12].longValue,
        },
      };
      data.push(currData);
      console.log("this is currData", currData);
    });

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
          {Object.values(cardData).map((cards) => {
            for (let i in cards) {
              return <SavedSim cardData={cards}></SavedSim>;
            }
          })}
        </div>
      </div>
    )
  );
};

export default ViewSimulations;
