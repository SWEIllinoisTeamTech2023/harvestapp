import { useRef, useState, useEffect, useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import usernameIcon from "../images/akar-icons_person.svg";
import passwordIcon from "../images/carbon_password.svg";
import logo from "../images/logo.png";
import "../styles/createaccount.css";
import {
  Dialog,
  Snackbar,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function CreateAccountForm() {
  Amplify.configure(awsconfig);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/login";
    navigate(path, { user: user });
  };

  const routeChangeHome = () => {
    let path = "/home";
    navigate(path);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const showError = (error) => {
    setOpenError(true);
    if (
      error ===
      "InvalidPasswordException: Password did not conform with policy: Password not long enough"
    ) {
      setErrorMessage("Password needs to be at least 8 characters");
    } else if (
      error === "InvalidParameterException: Invalid email address format."
    ) {
      setErrorMessage("Please enter a valid email");
    } else if (
      error ===
      "UsernameExistsException: An account with the given email already exists."
    ) {
      setErrorMessage(
        "An account with this email already exists. Please use another"
      );
    } else if (error === "AuthError: Password cannot be empty") {
      setErrorMessage("Password is empty, please enter a password");
    } else if (error === "AuthError: Username cannot be empty") {
      setErrorMessage("Email is empty, please enter an email");
    }
  };

  const signup = async () => {
    console.log("BUTT");
    if (password !== confirmPassword) {
      setErrorMessage("Password needs to match");
      console.log(password, confirmPassword);
      setOpenError(true);
    }
    try {
      console.log(email, password);
      const username = email;
      const { localUser } = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      });
      console.log(localUser);
      setUser(localUser);
      setConfirmDialog(true);
      verifyAccountHandler();
    } catch (error) {
      console.log("error signing up:", error);
      showError(error);
    }
  };

  const verifyAccountHandler = async () => {
    try {
      await Auth.confirmSignUp(email, verificationCode);
      navigate("/home", { state: { user: email } });
      // routeChangeHome();
    } catch (e) {
      console.log("this is error: ", e);
    }
  };

  const resendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      setOpenError(true);
    } catch (e) {
      console.log("this is error", e);
    }
  };

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
              onChange={handleEmailChange}
              ref={email.useRef}
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
              onChange={handlePasswordChange}
              ref={password.useRef}
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
              id="user-password-confirm"
              name="user-password-confirm"
              autoComplete="off"
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              ref={confirmPassword.useRef}
              //   required={!validUserContext.isLoggedIn}
            ></input>
          </div>
          <button
            className="createAccountButton"
            onClick={signup}
            type="button"
            // disabled={validUserContext.isLoggedIn}
          >
            Create Account
          </button>
          <button className="loginButton" onClick={routeChange}>
            Already have an account? Login
          </button>
        </form>
        <Snackbar open={openError} autoHideDuration={6000}>
          <Alert
            severity="error"
            onClose={() => {
              setOpenError(false);
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
          <Alert
            severity="success"
            onClose={() => {
              setOpenError(false);
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Verification code has been resent
          </Alert>
        </Snackbar>
        <Dialog
          className="confirmEmail"
          open={openConfirmDialog}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              maxWidth: "40%",
              minHeight: "40%",
              maxHeight: "40%",
              border: "2px",
              borderRadius: "30px",
              paddingLeft: "8px",
              paddingRight: "30px",
              paddingBottom: "10px",
            },
          }}
        >
          <DialogTitle sx={{ fontSize: "30px", fontWeight: "bold" }}>
            Confirm Email
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: "10%" }}>
              Please enter the verification code sent to your email.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Code"
              type="password"
              variant="standard"
              sx={{ fontSize: "50px" }}
              onChange={handleVerificationCodeChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={resendCode}>Resend Code</Button>
            <Button onClick={verifyAccountHandler}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateAccountForm;
