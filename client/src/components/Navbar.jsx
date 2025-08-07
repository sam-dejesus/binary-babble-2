import { Link, Outlet, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = ({ addOn }) => {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutCall = (event) => {
    event.preventDefault();
    navigate("/");
    Auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 logo" to="/homepage">
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
              {loggedIn ? (
                <Link className="nav-link" to="/homepage">Home</Link>
              ) : (
                <Link className="nav-link" to="/">Home</Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            {loggedIn ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logoutCall}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
            {addOn === 'cart' && (
              <>
                <li className='nav-item'>
                  <Link className="nav-link" to="/shop">Shop</Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/my-cart">Cart</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
