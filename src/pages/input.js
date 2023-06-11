import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const [tradeCostValue, setTradeCostValue] = useState();

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

  const handleTradeCostChange = (event) => {
    const value = parseFloat(event.target.value);
    setTradeCostValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Yield: ", yieldValue);
    console.log("Crop Type: ", cropTypeValue);
    console.log("Machine Type: ", machineTypeValue);
    console.log("Header Width: ", headerWidthValue);
    console.log("Trade Cost: ", tradeCostValue);

    setYieldValue(0);
    setCropTypeValue("");
    setMachineTypeValue("");
    setHeaderWidthValue(0);
    setTradeCostValue(0);
    navigate("/simulate");

    const param = {
      machine_type: machineTypeValue,
      header_width: headerWidthValue,
      yield: yieldValue,
      crop_type: cropTypeValue,
      trade_cost: tradeCostValue,
    };
    console.log("Param: ", param);
    fetch("/storeInputs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Perform any additional actions based on the response
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
        <div>
          <input
            className="inputBox"
            type="number"
            value={yieldValue}
            onChange={handleYieldChange}
            min="0"
            placeholder="Yield (lbs)"
          />
        </div>
        <div>
          <input
            className="inputBox"
            type="number"
            value={headerWidthValue}
            onChange={handleHeaderWidthChange}
            min="0"
            placeholder="Header Width (unit)"
          />
        </div>
        <div>
          <input
            className="inputBox"
            type="number"
            value={tradeCostValue}
            onChange={handleTradeCostChange}
            min="0"
            placeholder="Trade Cost ($)"
          />
        </div>
        <button
          className="button"
          type="submit"
          style={{ marginTop: "50px", height: "70px" }}
        >
          Calculate Cost of Harvest
        </button>
      </form>
    </div>
  );
};

export default AddData;
