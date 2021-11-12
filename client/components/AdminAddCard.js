import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../store/pokemoncards';

class AddCardView extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.card !== this.props.card) {
      this.setState({
        name: this.props.card.name,
        imageUrl: this.props.card.imageUrl,
        description: this.props.card.description,
        price: this.props.card.price,
        stock: this.props.card.stock,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const errorData = await this.props.createCard({ ...this.state });
    if (errorData !== undefined) {
      this.setState({
        error: errorData[0],
      });
    } else {
      return;
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;

    if (this.props.user.role !== 'admin') {
      return <div>You're not authorized to view this</div>;
    }

    return (
      <div className="singlecontainer">
        <div className="singlecardTitle">
          <h1>Add a card</h1>
        </div>
        <div className="adminPokemonCard">
          <div className="adminCardEditForm">
            <form id="editCard" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">
                  <h2>Card name:</h2> <br />
                  {this.state.name}
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(event) => handleChange(event)}
                  value={this.state.name}
                />{' '}
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <h2>Image URL:</h2> <br />
                  {this.state.imageUrl}
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  onChange={(event) => handleChange(event)}
                  value={this.state.imageUrl}
                />{' '}
              </div>
              <div>
                <label htmlFor="description">
                  <h2>Card description:</h2> <br />
                  {this.state.description}
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={(event) => handleChange(event)}
                  value={this.state.description}
                />{' '}
              </div>
              <div>
                <label htmlFor="price">
                  <h2>Card price:</h2> <br />
                  {this.state.price}
                </label>
                <input
                  type="text"
                  name="price"
                  onChange={(event) => handleChange(event)}
                  value={this.state.price}
                />{' '}
              </div>
              <div>
                <label htmlFor="stock">
                  <h2>Card stock:</h2> <br />
                  {this.state.stock}
                </label>
                <input
                  type="text"
                  name="stock"
                  onChange={(event) => handleChange(event)}
                  value={this.state.stock}
                />
              </div>
              <br />
              <div>
                <button className="submitButton" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const stateprops = (state) => {
  return {
    user: state.auth,
  };
};
const dispatchprops = (dispatch, { history }) => {
  return {
    createCard: (card) => dispatch(addCard(card, history)),
  };
};

export default connect(stateprops, dispatchprops)(AddCardView);
