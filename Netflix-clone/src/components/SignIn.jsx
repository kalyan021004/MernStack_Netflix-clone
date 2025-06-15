import React, { useState } from 'react';
import bgImage from '../assets/background.jpg';  // adjust path as needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API URL configuration
const API_URL ="https://mernstack-netflix-clone-cpvy.onrender.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,  // Using dynamic API URL
        { email, password },
        { withCredentials: true }
      );

      alert(res.data.message);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
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
            {error && <div className="text-danger mb-2">{error}</div>}
            <button
              type="submit"
              className="btn btn-danger w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-3 text-secondary" style={{ fontSize: '0.9rem' }}>
            New to Netflix? <a href="/signup" className="text-white text-decoration-none">Sign up now.</a>
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