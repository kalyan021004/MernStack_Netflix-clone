import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../assets/background.jpg';  // adjust path as needed
import Header from './header';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API URL configuration
  const API_URL = "https://mernstack-netflix-clone-cpvy.onrender.com";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/signup`,
        { email, password, username },
        { withCredentials: true }
      );
      
      alert(res.data.message);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.error("Register error:", err);
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
          <h2 className="mb-4 fw-bold">Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                className="form-control bg-secondary text-white border-0"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control bg-secondary text-white border-0"
                type="text"
                value={username}
                placeholder="Username (optional)"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control bg-secondary text-white border-0"
                type="password"
                value={password}
                placeholder="Password (min 6 characters)"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                autoComplete="new-password"
              />
            </div>
            {error && <div className="text-danger mb-2" role="alert">{error}</div>}
            <button
              disabled={loading}
              type="submit"
              className="btn btn-danger w-100 fw-semibold"
              aria-busy={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
          <div className="mt-3 text-secondary" style={{ fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <Link to="/signin" className="text-white text-decoration-none">
              Sign in now.
            </Link>
          </div>
          <div className="mt-2 text-secondary" style={{ fontSize: '0.8rem' }}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;