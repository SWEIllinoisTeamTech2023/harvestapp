import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import corn from "../images/corn.png";
import soy from "../images/soy.png";
import wheat from "../images/wheat.png";
import "../styles/input.css";
import Header from "../components/header";

const AddData = () => {
  const navigate = useNavigate();

  const [yieldValue, setYieldValue] = useState();
  const [cropTypeValue, setCropTypeValue] = useState("");
  const [machineTypeValue, setMachineTypeValue] = useState("");
  const [headerWidthValue, setHeaderWidthValue] = useState();
  const [annualHoursValue, setAnnualHoursValue] = useState();
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
    // fetchUser();
  }, []);

  const handleYieldChange = (event) => {
    const value = parseFloat(event.target.value);
    setYieldValue(value);
  };

  const handleCropTypeChange = (event) => {
    setCropTypeValue(event);
  };

  const cropTypeOptions = [
    { id: "corn", src: corn, alt: "Corn" },
    { id: "soy", src: soy, alt: "Soy" },
    { id: "wheat", src: wheat, alt: "Wheat" },
  ];

  const handleMachineTypeChange = (event) => {
    setMachineTypeValue(event);
  };

  const handleHeaderWidthChange = (event) => {
    const value = parseFloat(event.target.value);
    setHeaderWidthValue(value);
  };

  const handleAnnualHoursChange = (event) => {
    const value = parseFloat(event.target.value);
    setAnnualHoursValue(value);
  };

 const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Yield: ", yieldValue);
    console.log("Crop Type: ", cropTypeValue);
    console.log("Machine Type: ", machineTypeValue);
    console.log("Header Width: ", headerWidthValue);
    console.log("Annual Hours: ", annualHoursValue);

    setYieldValue(0);
    setCropTypeValue("");
    setMachineTypeValue("");
    setHeaderWidthValue(0);
    setAnnualHoursValue(0);

    const param = {
      // user: user.attributes.email,
      user: "test@gmail.com",
      machine_type: machineTypeValue,
      header_width: headerWidthValue,
      yield: yieldValue,
      crop_type: cropTypeValue,
      annual_hours: annualHoursValue,
    };
    fetch("/storeInputs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then(async (data) => {
        // const d = await data
        const d = await data.json()
        const input_id = d['data']
        // console.log("data: ", input_id);
        param['input_id'] = input_id
        console.log("Param: ", param);
        navigate("/simulate", {state: {data: param}});
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Header title="Input Data"></Header>
      <form onSubmit={handleSubmit}>
        <div>
          <h3> Machine Type: </h3>
          <div>
            <button
              type="button"
              className={machineTypeValue === "x" ? "selected" : ""}
              onClick={() => handleMachineTypeChange("x")}
            >
              X-Series
            </button>
            <button
              type="button"
              className={machineTypeValue === "s" ? "selected" : ""}
              onClick={() => handleMachineTypeChange("s")}
            >
              S-Series
            </button>
          </div>
        </div>
        <div>
          <h3>Choose a Crop Type:</h3>
          {cropTypeOptions.map((option) => (
            <div
              key={option.id}
              className={`crop-type ${
                cropTypeValue === option.id ? "selected" : ""
              }`}
              onClick={() => handleCropTypeChange(option.id)}
            >
              <img src={option.src} alt={option.alt} width={100} height={100} />
              {cropTypeValue === option.id && <div className="overlay" />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField
            InputProps={{
              style: {
                width: "300px",
                height: "50px",
                background: "white",
                borderRadius: "10px",
                fontSize: "larger",
              },
            }}
            id="filled"
            type="number"
            label="Yield (lbs)"
            variant="filled"
            value={yieldValue}
            onChange={handleYieldChange}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField
            InputProps={{
              style: {
                width: "300px",
                height: "50px",
                background: "white",
                borderRadius: "10px",
                fontSize: "larger",
              },
            }}
            id="filled"
            type="number"
            label="Header Width (ft)"
            variant="filled"
            value={headerWidthValue}
            onChange={handleHeaderWidthChange}
          />
        </div>
        <div>
          <select
            id="dropdown"
            value={annualHoursValue}
            className="inputBoxMain"
            onChange={handleAnnualHoursChange}
          >
            <option value="">Select Estimated Annual Hours</option>
            <option value={100}>100</option>
            <option value={300}>300</option>
            <option value={500}>500</option>
          </select>
        </div>
        <button
          className="button"
          type="submit"
          style={{ marginTop: "40px", height: "70px" }}
        >
          Calculate Cost of Harvest
        </button>
      </form>
    </div>
  );
};

export default AddData;
