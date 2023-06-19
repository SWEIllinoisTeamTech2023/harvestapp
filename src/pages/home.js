import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../styles/home.css";
import Navbar from "../components/navbar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

const Home = () => {
  const location = useLocation();
  // const user = location.state.user;
  const [userIn2, setUser] = useState();
  const [email, setEmail] = useState();
  // const { userIn, signOut } = useAuthenticator((context) => [context.user]);
  // console.log("this is uuse in home: ", userIn);

  async function fetchUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((userIn2) => {
        console.log("in fetchUser: ", userIn2.attributes.email);
        setUser(userIn2);
        setEmail(userIn2.attributes.email);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="Home" id="Home">
      <Header title="Home"></Header>
      <div>Hi {email}</div>
    </div>
  );
};

export default Home;
