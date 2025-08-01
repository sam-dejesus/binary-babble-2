import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphQL/mutations';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [loginMutation, { error }] = useMutation(LOGIN_USER);
  const { login } = useContext(AuthContext); // ✅ use context version

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: { ...formState },
      });

      login(data.login.token);     // ✅ triggers context + cache refresh
      navigate('/homepage');       // ✅ navigate after state is updated
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4">Welcome Back</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email-login" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email-login"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-login" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password-login"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-danger">Login failed. Please try again.</p>}
        <button type="submit" className="btn btn-outline-info me-2">Log In</button>
        <Link to="/signup" className="btn btn-outline-success">Sign Up</Link>
      </form>
    </main>
  );
};

export default Login;
