import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
	const { userEmail } = props;

	return (
		<div>
			<h3>Welcome, {userEmail}</h3>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		userEmail: state.auth.userEmail,
	};
};

export default connect(mapState)(Home);
