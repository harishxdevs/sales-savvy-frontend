import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/styles.css";
import { API_BASE, checkBackend } from './api';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [backendUp, setBackendUp] = useState(null); // null = checking
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    checkBackend().then((ok) => alive && setBackendUp(ok));
    return () => { alive = false; };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "CUSTOMER") {
          navigate("/customerhome");
        } else if (data.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/"); // Redirect to a default page if role is unknown
        }
      } else {
        const errorMessage =
          data.error || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="page-layout">
      {backendUp === false && (
        <div className="backend-banner" role="status">
          <strong>Backend is waking up or offline.</strong> This demo talks to a Spring Boot API at{" "}
          <code>{API_BASE}</code>. Free hosting sleeps when idle, so give it ~30 seconds and refresh.
          Source: <a href="https://github.com/harishxdevs/sales-savvy-backend" target="_blank" rel="noreferrer">sales-savvy-backend</a>
        </div>
      )}
      <div className="page-container">
        <div className="form-container">
          <h1 className="form-title">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignIn} className="form-content">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button">
              Sign In
            </button>
          </form>
          <div className="form-footer">
            <a href="/register" className="form-link">
              New User? Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}