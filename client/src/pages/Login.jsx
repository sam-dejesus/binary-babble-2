import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted');
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4">Welcome Back</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username-login" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username-login"
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-login" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password-login"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-outline-info me-2">Log In</button>
        <Link to="/signup" className="btn btn-outline-success">Sign Up</Link>
      </form>
    </main>
  );
};

export default Login;
