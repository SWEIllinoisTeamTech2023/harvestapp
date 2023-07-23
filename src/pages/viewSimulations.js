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
      <Header title="View Saved Simulations"></Header>
      <div class="view-parent">
        <SavedSim />
        <SavedSim />
      </div>
    </div>
  );
};

export default ViewSimulations;
