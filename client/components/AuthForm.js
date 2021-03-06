import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<body>
			<div className='login-box'>
				<form onSubmit={handleSubmit} name={name}>
					<div className='user-box'>
						<label htmlFor='userEmail'>
							<small>Username</small>
						</label>
						<input name='userEmail' type='text' />
					</div>
					<div className='user-box'>
						<label htmlFor='password'>Password</label>
						<input name='password' type='password' />
					</div>
					<button type='submit'>
						{displayName}
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</button>
					{error && error.response && <div> {error.response.data} </div>}
				</form>
			</div>
		</body>
	);
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.auth.error,
	};
};

const mapSignup = (state) => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.auth.error,
	};
};

const mapDispatch = (dispatch, { history }) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const userEmail = evt.target.userEmail.value;
			const password = evt.target.password.value;
			dispatch(authenticate(userEmail, password, formName, history));
		},
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
