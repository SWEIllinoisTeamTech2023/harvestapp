import { useRef, useEffect, useContext } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";

// import classes from "./LoginForm.module.scss";
import usernameIcon from "../images/akar-icons_person.svg";
import passwordIcon from "../images/carbon_password.svg";
// import ValidUserContext from "../authCheck";

let isInitial = true;

function LoginForm() {
  //   const validUserContext = useContext(ValidUserContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //   useEffect(() => {
  //     if (isInitial) {
  //       validUserContext.localAuthCheck();
  //       isInitial = false;
  //     }
  //   }, [validUserContext]);

  //   const submitHandler = (event) => {
  //     event.preventDefault();

  //     validUserContext.apiAuthCheck(
  //       emailInputRef.current.value,
  //       passwordInputRef.current.value
  //     );
  //   };

  return (
    <div>
      <div className="LoginHeader">
        <img src={logo} width={100} height={100} alt="Logo"></img>
      </div>
      <div className="LoginLayout">
        <form className="LoginForm">
          <div>
            <title className="LoginTitle">Login</title>
            <div style={{ color: "white" }}>
              Please enter your Login and your Password
            </div>
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
              placeholder="Username or E-mail"
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
          <button
            className="loginButton"
            // disabled={validUserContext.isLoggedIn}
          >
            Login
          </button>
          <button
            className="createAccountButton"
            // disabled={validUserContext.isLoggedIn}
          >
            Don't have an account? Create one
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
