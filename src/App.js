import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import SignUp from "./pages/signup";
import InputData from "./pages/inputData";
import Simulate from "./pages/simulate";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateAccount />} />
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/signup" element={<CreateAccount />} /> */}
          <Route exact path="/inputdata" element={<InputData />} />
          <Route exact path="/simulate" element={<Simulate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
