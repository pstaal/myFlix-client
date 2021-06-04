import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {
    this.getUser();
  }


  getUser = () => {
    let token = localStorage.getItem('token');
    axios.get(`https://whispering-journey-40194.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        user: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {

    const { onBackClick } = this.props;
    const { user } = this.state;
 
    console.log(user);

    return (
      <>
      {user && 
      <div className="profile-view">
        <div className="user-name">
          <span className="label">Name: </span>
          <span className="value">{user.Username}</span>
        </div>
        <div className="user-email">
          <span className="label">Email: </span>
          <span className="value">{user.Email}</span>
        </div>
        <div className="user-birth">
          <span className="label">Birthdate: </span>
          <span className="value">{user.Birthday}</span>
        </div>
        <Button variant="link" onClick={() => { onBackClick(); }}>Back</Button>
      </div>
      }
      </>
    );
  }
}
