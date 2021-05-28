import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [email, setEmail ] = useState('');
  const [birthDate, setBirthDate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthDate);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration();
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
      
       <Form.Label>email:</Form.Label> 
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
     
      </Form.Group>
      <Form.Group controlId="formBirthDate">
     
       <Form.Label>birthdate:</Form.Label> 
        <Form.Control type="text" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
      
      </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};