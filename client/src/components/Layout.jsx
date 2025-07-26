import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../graphQL/queries'
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';


const Layout = ({ loggedIn }) => {
  const navigate = useNavigate();

  const logoutCall = (event) => {
    event.preventDefault();
    navigate("/")
    Auth.logout();
  };

  const { loading, error, data } = useQuery(QUERY_ME);
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand fs-2 logo" to="/">
              <span className="text-info">Binary</span> Babel
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                {data ? (
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={logoutCall}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container flex-grow-1" style={{ marginBottom: '15vh' }}>
        <Outlet /> {/* or use props.children if you're not using react-router */}
      </main>

      <footer className="bg-dark text-white py-3 mt-auto" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <div className="container">
          <div className="row justify-content-center">
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
