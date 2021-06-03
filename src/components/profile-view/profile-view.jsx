import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class ProfileView extends React.Component {

  render() {
    const { user, onBackClick } = this.props;

    console.log(user);

    return (
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
    );
  }
}
