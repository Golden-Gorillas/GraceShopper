import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

export const Navbar = ({ handleClick, isLoggedIn, userEmail, user }) => {
  return (
    <div>
      <h1 className="navText">Golden Gorillas Pokemon Card Store</h1>
      <nav>
        {!user ? (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/cards">Card Inventory</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            {/* <Link to='/cards'>Card Inventory</Link> */}
          </div>
        ) : user === 'admin' ? (
          <div>
            {/* The navbar will show these links to admins */}
            <Link to="/">Home</Link>
            <Link to="/cards">Card Inventory</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/admin">Admin</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <Link to="/cards">Card Inventory</Link>
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <h3>Welcome, {userEmail} </h3>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth.role,
    isLoggedIn: !!state.auth.id,
    userEmail: state.auth.userEmail,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
