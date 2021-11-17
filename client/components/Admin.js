import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../store/pokemoncards';
import { fetchUsers } from '../store/users';
import { deleteCard } from '../store/pokemoncards';
import { Link } from 'react-router-dom';

class Admin extends Component {
	constructor() {
		super();
		this.state = {
			activeView: '',
		};
	}

	componentDidMount() {
		this.props.getCards();
		this.props.getUsers();
	}

	render() {
		if (this.props.user.role !== 'admin') {
			return <div>You're not authorized to view this</div>;
		}

		return (
			<div className='background'>
				<div className='adminTop'>
					<div className='adminHeader'>
						<h2>What would you like to view?</h2>
					</div>
					<div className='headerButtons'>
						<button onClick={() => this.setState({ activeView: 'Cards' })}>
							Pokemon Inventory
						</button>{' '}
						<button onClick={() => this.setState({ activeView: 'Users' })}>
							All Users
						</button>
					</div>

					{this.state.activeView === 'Cards' ? (
						<Link to={`/admin/cards/add`}>
							<button>Create a new Pokemon</button>
						</Link>
					) : (
						''
					)}

					<div className='adminMain'>
						{this.state.activeView === 'Cards'
							? !this.props.cards
								? 'Loading'
								: this.props.cards.map((card) => {
										return (
											<div key={card.id} className='adminCard'>
												<div className='adminCardIMG'>
													<img src={card.imageUrl} />
												</div>{' '}
												<div>
													<strong>Card Name: </strong>
													{card.name}
												</div>{' '}
												<div>
													<strong># in stock: </strong>
													{card.stock}{' '}
												</div>{' '}
												<div>
													<strong>Price: </strong>$ {card.price}{' '}
												</div>{' '}
												<div>
													<Link to={`/admin/cards/${card.id}`}>
														{' '}
														<button>Edit</button>{' '}
													</Link>
													<button
														type='button'
														onClick={() => {
															this.props.removeCard(card.id);
														}}>
														Delete
													</button>
												</div>
											</div>
										);
								  })
							: ''}

						{this.state.activeView === 'Users'
							? !this.props.users
								? 'Loading'
								: this.props.users.map((user) => {
										return (
											<div className='userCard' key={user.id}>
												{' '}
												<strong>User Email:</strong>
												{user.userEmail}
												<div>
													<strong>User Role:</strong>
													{user.role}
												</div>
											</div>
										);
								  })
							: ''}
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		user: state.auth,
		cards: state.cards,
		users: state.users,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getUsers: () => dispatch(fetchUsers()),
		getCards: () => dispatch(fetchCards()),
		removeCard: (id) => dispatch(deleteCard(id)),
	};
};

export default connect(mapState, mapDispatch)(Admin);
