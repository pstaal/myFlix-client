import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [email, setEmail ] = useState('');
  const [birthDate, setBirthDate ] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://whispering-journey-40194.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthDate
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
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
        <Button variant="primary" type="submit" onClick={handleRegister}>Submit</Button>
    </Form>
  );
}
