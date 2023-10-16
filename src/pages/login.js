import Modal from "@mui/material/Modal";
// import Modal from "react-modal";
import { useState, useRef } from "react";
import * as React from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Amplify, Auth } from "aws-amplify";
import usernameIcon from "../images/akar-icons_person.svg";
import passwordIcon from "../images/carbon_password.svg";
import {
  Dialog,
  Snackbar,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function LoginForm({ navigation }) {
  let navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 10,
    p: 4,
    justifyContent: "center",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
            @font-face {
              font-family: 'Raleway';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
      },
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
  const handleOpenForgotPassword = () => {
    forgotPasswordHandler();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCodeChange = (event) => {
    setForgotCode(event.target.value);
  };

  const showError = (error) => {
    setOpenError(true);
    if (error === "AuthError: Username cannot be empty") {
      setErrorMessage("Invalid Email, please try again");
    } else if (
      error === "NotAuthorizedException: Incorrect username or password."
    ) {
      console.log("here");
      setErrorMessage("Incorrect email or password, please try again");
    } else if (error === "UserNotFoundException: User does not exist.") {
      setErrorMessage("Email doesn't exist, please enter a valid email");
    } else if (
      error === "InvalidParameterException" ||
      error ===
      "UserNotFoundException: Username/client id combination not found." ||
      error ===
      "InvalidParameterException: Custom auth lambda trigger is not configured for the user pool."
    ) {
      setErrorMessage("Email doesn't exist, please enter a valid email");
    } else if (
      error ===
      "InvalidPasswordException: Password does not conform to policy: Password not long enough"
    ) {
      setErrorMessage("Password needs to be at least 8 characters");
    }
  };

  const signIn = async () => {
    console.log(email, password);
    try {
      const localuser = await Auth.signIn(email, password);
      setUser(localuser);
      console.log("in signin: ", localuser);
      navigate("/input", { state: { user: email } });
      // routeChange();
    } catch (e) {
      showError(e);
      console.log(e);
    }
  };

  const forgotPasswordHandler = () => {
    try {
      if (email === "") {
        setOpenError(true);
        setErrorMessage("Email is empty, please enter and try again");
      } else {
        setOpenForgotPassword(true);
        Auth.forgotPassword(email);
      }
    } catch (e) {
      showError(e);
      console.log("from forgotpassword: ", e);
    }
  };

  const signInForgotPassword = async () => {
    await Auth.forgotPasswordSubmit(email, forgotCode, password);
    const user = Auth.signIn(email, password);
    navigate("/input", { state: { user: email } });
  };

  return (
    <div>
      <div className="LoginHeader">
        <img src={logo} width={100} height={100} alt="Logo"></img>
      </div>
      <div className="LoginLayout">
        <form className="LoginForm">
          <div>
            <title className="LoginTitle">Login</title>
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
              ref={email.useRef}
              onChange={handleEmailChange}
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
          </Snackbar>
          <div>
            <Dialog
              className="forgotPassword"
              open={openForgotPassword}
              fullWidth
              onClose={() => setOpenForgotPassword(false)}
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
                Forgot Password
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ marginBottom: "10%" }}>
                  Please enter the code sent to your email.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  fullWidth
                  id="code"
                  label="Code"
                  type="password"
                  variant="standard"
                  sx={{ fontSize: "50px" }}
                  onChange={handleCodeChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  fullWidth
                  id="new_password"
                  label="New Password"
                  type="password"
                  variant="standard"
                  sx={{ fontSize: "50px" }}
                  onChange={handlePasswordChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={signInForgotPassword}>Submit</Button>
                <Button onClick={forgotPasswordHandler}>Resend</Button>
              </DialogActions>
            </Dialog>
          </div>
          <ThemeProvider theme={theme}>
            <Button
              className="forgotpasswordbutton"
              onClick={handleOpenForgotPassword}
              color="primary"
              type="button"
            >
              Forgot Password?
            </Button>
          </ThemeProvider>
          <button
            className="createAccountButton"
            type="button"
            onClick={signIn}
          // disabled={validUserContext.isLoggedIn}
          >
            Login
          </button>
          <button
            className="loginButton"
            type="button"
            onClick={() => {
              navigate("/create");
            }}
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
