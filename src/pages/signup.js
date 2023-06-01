import React from "react";
import { Link } from 'react-router-dom';
const SignUp = () => {
  return (
    <div>
      <h1>
        Create an account 
      </h1>
      <Link to="/">
          <button>Home</button>
      </Link>
    </div>
  );
};
  
export default SignUp;