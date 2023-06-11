import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import SignUp from "./pages/signup";
import Input from "./pages/input";
import Simulate from "./pages/simulate";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

function App() {
  Amplify.configure(awsExports);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateAccount />} />
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/signup" element={<CreateAccount />} /> */}
          <Route exact path="/input" element={<Input />} />
          <Route exact path="/simulate" element={<Simulate />} />
          {/* <Route exact path="/forgotpassword" element={<Simulate />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
