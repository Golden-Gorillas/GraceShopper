import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../store/pokemoncards';
import { fetchUsers } from '../store/users';

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
      <div>
        <div>
          <h2>What would you like to view?</h2>
        </div>
        <div>
          <button onClick={() => this.setState({ activeView: 'Cards' })}>
            Pokemon Inventory
          </button>{' '}
          <button onClick={() => this.setState({ activeView: 'Users' })}>
            All Users
          </button>
        </div>

        <div>
          {this.state.activeView === 'Cards'
            ? !this.props.cards
              ? 'Loading'
              : this.props.cards.map((card) => {
                  return <div key={card.id}> {card.name} </div>;
                })
            : ''}

          {this.state.activeView === 'Users'
            ? !this.props.users
              ? 'Loading'
              : this.props.users.map((user) => {
                  return <div key={user.id}> {user.userEmail} </div>;
                })
            : ''}
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
  };
};

export default connect(mapState, mapDispatch)(Admin);
