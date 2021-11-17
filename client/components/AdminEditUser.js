import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';
import { updateUsers } from '../store/users';

class EditUserView extends Component {
  constructor() {
    super()
    this.state = {
      userEmail: "",
      role: ""
    };
  }



componentDidMount() {
  this.props.getUser(this.props.matchparams.id);
}

componentDidUpdate(prevProps) {
  if(prevProps.user !== this.props.user) {
    this.setState({
      userEmail: this.props.user.userEmail,
      role: this.props.user.role
    })
  }
}

render() {
  const { handleSubmit, handlechange } = this;

  if (this.props.user.role !== 'admin') {
    return ( <div>you are not authorized to edit user information</div>)
  }

  return (
    <div>
      <div>
        <h1>Edit User Info</h1>
      </div>

    </div>
  )

}


}
