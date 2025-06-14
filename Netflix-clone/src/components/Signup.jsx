import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://mern-stack-netflix-clone-uatc.vercel.app/register",
        { email, password },
        { withCredentials: true }
        
    );
    alert(res.data.message);
    navigate('/signin'); // or navigate('/') or any route you want
    } catch (err) {
      alert(err.response?.data?.message || "Error");
      console.error("Register error:", err);
    }
    
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <input
          className="form-control my-2"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control my-2"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button  type="submit" className="btn btn-danger w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
