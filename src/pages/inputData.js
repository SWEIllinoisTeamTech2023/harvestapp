import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const AddData = () => {

  const navigate = useNavigate();

  const [yieldValue, setYieldValue] = useState();
  const [cropTypeValue, setCropTypeValue] = useState('');
  const [machineTypeValue, setMachineTypeValue] = useState('');
  const [headerWidthValue, setHeaderWidthValue] = useState();
  const [tradeCostValue, setTradeCostValue] = useState();  

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
    navigate('/simulate');

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
        <input type="number" value={yieldValue} onChange={handleYieldChange} placeholder='Enter Crop Yield' min="0" style={{width: '200px'}}/>
    </div>
    <div>
      <select id="cropTypeDropdown" value={cropTypeValue} onChange={handleCropTypeChange}  style={{width: '200px'}}>
        <option value="">Choose Crop Type</option>
        <option value="corn">Corn</option>
        <option value="wheat">Wheat</option>
        <option value="soy">Soy</option>
        <option value="canola">Canola</option>
        <option value="barley">Barley</option>
      </select>
    </div>
    <div>
      <select id="machineTypeDropdown" value={machineTypeValue} onChange={handleMachineTypeChange} style={{width: '200px'}}>
        <option value="">Choose Machine Type</option>
        <option value="X">X-series</option>
        <option value="S">S-series</option>
      </select>
      
    </div>
    <div>
      <input type="number" value={headerWidthValue} onChange={handleHeaderWidthChange} min="0" placeholder='Enter Header Width (unit)'  style={{width: '200px'}} />
    </div>
    <div>
      <input type="number" value={tradeCostValue} onChange={handleTradeCostChange} min="0" placeholder='Enter Trade Cost ($)'  style={{width: '200px'}} />
    </div>
    <button type="submit" style={{marginTop: '30px', height: '40px'}} >Calculate Cost of Harvest</button>
    </form>
    
    <Link to="/">
        <button style={{marginTop: '30px'}} >Home </button>
    </Link>
    </div>
  );
};
  
export default AddData;