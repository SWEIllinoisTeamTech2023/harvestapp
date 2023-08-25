import React, { useState, useEffect } from "react";
import "../styles/viewsimulations.css";
import { useNavigate } from "react-router-dom";

const SavedSim = (props) => {
  const cardData = props.cardData;
  const navigate = useNavigate();
  const inputVar = props.cardData.inputVar;
  var date = new Date(cardData.date);
  date = date.toDateString();

  console.log("IN SAVEDSIM: ", cardData);

  const handleSaveSim = () => {
    console.log("carddata: ", cardData)
    navigate("/simulate", { state: { data: cardData } });
  };

  return (
    <div class="sim-card">
      <div class="text-row" style={{ fontWeight: "bold", fontSize: "25px" }}>
        {cardData.name}
      </div>
      <div class="text-row">{date}</div>
      <div class="text-row">Crop Type: {cardData.cropType}</div>
      <div class="text-row">Machine Type: {cardData.machineType}</div>
      <div class="text-row">Overall Cost: {cardData.totalCost}</div>
      <div
        style={{
          border: "2px solid darkgray",
          borderLeft: "2px solid darkgray",
          borderRight: "2px solid darkgray",
          marginLeft: "15px",
          marginRight: "15px",
          borderRadius: "10px",
          marginTop: "50px",
        }}
      >
        <div
          class="text-row"
          style={{
            marginTop: "15px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Input Variables
        </div>
        <div class="input-var-grid">
          <div class="text-elem">
            Chaffer Clearance: {inputVar.chafferClear}
          </div>
          <div class="text-elem">
            Concave Clearance: {inputVar.concaveClear}
          </div>
          <div class="text-elem">Sieve Clearance: {inputVar.sieveClear}</div>
          <div class="text-elem">Speed: {inputVar.speed}</div>
          <div class="text-elem">Fan Speed: {inputVar.fanSpeed}</div>
          <div class="text-elem">Rotor Speed: {inputVar.rotorSpeed}</div>
        </div>
      </div>
      <button
        //pass on data to create chart
        className="view-button"
        type="submit"
        onClick={() => handleSaveSim()}
      > 
        View in Simulation
      </button>
    </div>
  );
};

export default SavedSim;
