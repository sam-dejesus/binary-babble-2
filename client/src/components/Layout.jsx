import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Layout = ({ loggedIn }) => {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      {/* Head tags are handled in index.html, but Bootstrap can be imported here or in index.html */}
      
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
                {loggedIn ? (
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => {
                      // handle logout logic here
                    }}>
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
            {/* Add footer content here */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
