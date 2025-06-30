import React from 'react';

const SignUp = () => {
  return (
    <main className="container mt-5">
      <h1 className="mb-4">
        Welcome to <span className="text-info">Binary</span> Babel
      </h1>
      <form id="signup-form" className="signup-form">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password must be over (8) Characters long"
          />
        </div>
        <button type="submit" className="btn btn-outline-info">Sign Up</button>
      </form>
    </main>
  );
};

export default SignUp;
