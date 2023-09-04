import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "../styles/viewsimulations.css";
import SavedSim from "../components/savedsim";

const ViewSimulations = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([
    {
      inputId: null,
      id: null,
      name: null,
      date: null,
      crop_type: null,
      machine_type: null,
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
        fetchData(user.attributes.email);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchUser();
    // fetchData();
  }, [isLoading]);

  const fetchData = async (email) => {
    console.log("IN fetch data: ", email);
    const response = await fetch("/getSavedSimulations?user=" + email, {
      method: "GET",
    });
    const responseRec = await response.json();
    console.log("responseRec: ", responseRec);
    var data = [];
    responseRec.forEach((element) => {
      console.log(element);
      var currData = {
        input_id: element[0].longValue,
        id: element[1].longValue,
        user: element[2].stringValue,
        name: element[3].stringValue,
        date: element[4].stringValue,
        crop_type: element[5].stringValue,
        machine_type: element[6].stringValue,
        inputVar: {
          rotorSpeed: element[7].longValue,
          fanSpeed: element[8].longValue,
          speed: element[9].longValue,
          sieveClear: element[10].longValue,
          concaveClear: element[11].longValue,
          chafferClear: element[12].longValue,
        },
        totalCost: element[13].longValue,
      };
      data.push(currData);
      setIsLoading(false);
      console.log("this is currData", currData);
    });

    setCardData(data);
    console.log("IN FETCHDATA: ", cardData);
  };

  return (
    console.log("IN return: ", cardData),
    (
      <div>
        <Header title="View Saved Simulations"></Header>
        <div style={{ marginTop: 170 }} class="view-parent">
          {!isLoading &&
            Object.values(cardData).map((cards) => {
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
