import { useRef, useEffect, useContext } from "react";
import "../styles/createaccount.css";
import logo from "../images/logo.png";
import { Route, useNavigate } from "react-router-dom";
import login from "./login";
// import Amplify, { Auth } from "aws-amplify";
// import awsconfig from "../aws-exports";

// import classes from "./LoginForm.module.scss";
import usernameIcon from "../images/akar-icons_person.svg";
import passwordIcon from "../images/carbon_password.svg";
// import ValidUserContext from "../authCheck";

let isInitial = true;

function CreateAccountForm() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/login";
    navigate(path);
  };
  //   const validUserContext = useContext(ValidUserContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // async function signup() {
  //   try {
  //     const { user } = await Auth.signUp({
  //       emailInputRef,
  //       passwordInputRef,
  //       autoSignIn: {
  //         enabled: true,
  //       },
  //     });
  //     console.log(user);
  //   } catch (error) {
  //     console.log("error signing up:", error);
  //   }
  // }

  return (
    <div>
      <div className="CreateAccountHeader">
        <img src={logo} width={100} height={100} alt="Logo"></img>
      </div>
      <div className="CreateAccountLayout">
        <form className="CreateAccountForm">
          <div>
            <title className="CreateAccountTitle">Sign Up</title>
          </div>
          <div>
            <img
              className="icon"
              src={usernameIcon}
              alt="Username icon"
              htmlFor="user-name"
            ></img>
            <input
              className="input"
              type="email"
              id="user-name"
              name="user-name"
              autoComplete="on"
              placeholder="E-mail"
              ref={emailInputRef}
              //   required={!validUserContext.isLoggedIn}
            ></input>
          </div>

          <div>
            <img
              className="icon"
              src={passwordIcon}
              alt="Password icon"
              htmlFor="user-password"
            ></img>
            <input
              className="input"
              type="password"
              id="user-password"
              name="user-password"
              autoComplete="off"
              placeholder="Password"
              ref={passwordInputRef}
              //   required={!validUserContext.isLoggedIn}
            ></input>
          </div>
          <div>
            <img
              className="icon"
              src={passwordIcon}
              alt="Password icon"
              htmlFor="user-password"
            ></img>
            <input
              className="input"
              type="password"
              id="user-password"
              name="user-password"
              autoComplete="off"
              placeholder="Confirm Password"
              ref={passwordInputRef}
              //   required={!validUserContext.isLoggedIn}
            ></input>
          </div>
          <button
            className="createAccountButton"
            // onClick={signup}
            // disabled={validUserContext.isLoggedIn}
          >
            Create Account
          </button>
          <button
            className="loginButton"
            // disabled={validUserContext.isLoggedIn}
            onClick={routeChange}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountForm;
