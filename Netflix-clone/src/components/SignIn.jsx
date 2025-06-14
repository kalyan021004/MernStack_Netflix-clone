import React, { useState } from 'react';
import bgImage from '../assets/background.jpg';  // adjust path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://mern-stack-netflix-clone-uatc.vercel.app/login',
        { email, password },
        { withCredentials: true } // important for session cookies
      );

      alert(res.data.message); // e.g. "Logged in successfully"
      navigate('/home'); // redirect to home or dashboard after login
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Header></Header>
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '1rem',
      }}
      >
      <div
        className="bg-dark text-white p-4 rounded"
        style={{ maxWidth: '350px', width: '100%', opacity: 0.9 }}
        >
        <h2 className="mb-4 fw-bold">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-secondary text-white border-0"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control bg-secondary text-white border-0"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-danger w-100 fw-semibold">
            Sign In
          </button>
        </form>
        <div className="mt-3 text-secondary" style={{ fontSize: '0.9rem' }}>
          New to Netflix? <a href="/" className="text-white text-decoration-none">Sign up now.</a>
        </div>
        <div className="mt-2 text-secondary" style={{ fontSize: '0.8rem' }}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </div>
      </div>
    </div>
              </>
  );
}

export default SignIn;
