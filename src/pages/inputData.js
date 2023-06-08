import React, {useState} from 'react';
import { Link } from 'react-router-dom';



const AddData = () => {

  const [yieldValue, setYieldValue] = useState(0);
  const [cropTypeValue, setCropTypeValue] = useState('');
  const [machineTypeValue, setMachineTypeValue] = useState('');
  const [headerWidthValue, setHeaderWidthValue] = useState(0);
  const [tradeCostValue, setTradeCostValue] = useState(0);  

  const handleYieldChange = (event) => {
    const value = parseFloat(event.target.value);
    setYieldValue(value);
  };

  const handleCropTypeChange = (event) => {
    setCropTypeValue(event.target.value);
  };

  const handleMachineTypeChange = (event) => {
    setMachineTypeValue(event.target.value);
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
    setCropTypeValue('');
    setMachineTypeValue('');
    setHeaderWidthValue(0);
    setTradeCostValue(0);

    const param = {machine_type: machineTypeValue, header_width: headerWidthValue, yield: yieldValue, crop_type: cropTypeValue, trade_cost: tradeCostValue};
    fetch('/storeInputs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Perform any additional actions based on the response
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
    <h1>Input data here</h1>
    <form onSubmit={handleSubmit}>
    <div>
      <label> Crop Yield: 
        <input type="number" value={yieldValue} onChange={handleYieldChange} />
      </label>
    </div>
    <div>
      <label> Crop Type: 
        <input type="text" value={cropTypeValue} onChange={handleCropTypeChange} />
      </label>
    </div>
    <div>
      <label> Machine Type: 
        <input type="text" value={machineTypeValue} onChange={handleMachineTypeChange} />
      </label>
    </div>
    <div>
      <label> Header Width: 
        <input type="number" value={headerWidthValue} onChange={handleHeaderWidthChange} />
      </label>
    </div>
    <div>
      <label> Trade Cost: 
        <input type="number" value={tradeCostValue} onChange={handleTradeCostChange} />
      </label>
    </div>
    <button type="submit">Calculate Cost of Harvest</button>
    </form>
    
    <Link to="/">
        <button>Home</button>
    </Link>
    </div>
  );
};
  
export default AddData;