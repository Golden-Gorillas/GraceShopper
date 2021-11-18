import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

export const Navbar = ({ handleClick, isLoggedIn, userEmail, user }) => {
	return (
		<div className='navHeadline'>
			<h1 className='navText'>Golden Gorillas Pokemon Card Store
			<img id="GGLogo" src="GoldenGorLOGO.png"/></h1>
			<nav>
				{!user ? (
					<div className='navList'>
						{/* The navbar will show these links before you log in */}
						<Link className='Link' to='/'>
							Home
						</Link>
						<Link className='Link' to='/cards'>
							Card Inventory
						</Link>
						<Link className='Link' to='/cart'>
							Cart
						</Link>
						<Link className='Link' to='/login'>
							Login
						</Link>
						<Link className='Link' to='/signup'>
							Sign Up
						</Link>
						{/* <Link to='/cards'>Card Inventory</Link> */}
					</div>
				) : user === 'admin' ? (
					<div className='navList'>
						{/* The navbar will show these links to admins */}
						<Link className='Link' to='/'>
							Home
						</Link>
						<Link className='Link' to='/cards'>
							Card Inventory
						</Link>
						<Link className='Link' to='/cart'>
							Cart
						</Link>
						<Link className='Link' to='/admin'>
							Admin
						</Link>
						<a className='Link' href='#' onClick={handleClick}>
							Logout
						</a>
					</div>
				) : (
					<div className='navList'>
						{/* The navbar will show these links after you log in */}
						<Link className='Link' to='/'>
							Home
						</Link>
						<Link className='Link' to='/cards'>
							Card Inventory
						</Link>
						<Link className='Link' to='/cart'>
							Cart
						</Link>
						<a className='Link' href='#' onClick={handleClick}>
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
