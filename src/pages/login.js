import Modal from "@mui/material/Modal";
// import Modal from "react-modal";
import { useRef } from "react";
import * as React from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import usernameIcon from "../images/akar-icons_person.svg";
import passwordIcon from "../images/carbon_password.svg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { white } from "@mui/material/colors";

let isInitial = true;

function LoginForm() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    //CHANGE PATH
    navigate(path);
  };
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div class="forgot">
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ThemeProvider theme={theme}>
                  <Typography
                    className="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Forgot Password
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    variant="h6"
                    sx={{ mt: 2 }}
                  >
                    Enter your email to recieve link
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                </ThemeProvider>
              </Box>
            </Modal>
          </div>
          <ThemeProvider theme={theme}>
            <Button
              className="forgotpasswordbutton"
              onClick={handleOpen}
              color="primary"
              // disabled={validUserContext.isLoggedIn}
            >
              Forgot Password?
            </Button>
          </ThemeProvider>
          <button
            className="createAccountButton"
            // disabled={validUserContext.isLoggedIn}
          >
            Login
          </button>
          <button
            className="loginButton"
            onClick={routeChange}
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
