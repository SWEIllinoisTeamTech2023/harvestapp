import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import ViewSimulations from "./pages/viewSimulations";
import Input from "./pages/input";
import Simulate from "./pages/simulate";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

function App() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <div className="App">
      {/* {authStatus !== "authenticated" ? <Authenticator /> : <Home />} */}
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<CreateAccount />} /> */}
          <Route exact path="/" element={<ViewSimulations />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/input" element={<Input />} />
          <Route exact path="/view-simulations" element={<ViewSimulations />} />
          <Route exact path="/simulate" element={<Simulate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
