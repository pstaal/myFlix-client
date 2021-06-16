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
  const [validated, setValidated] = useState(false);

  const handleRegister = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

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
    <Form noValidate validated={validated} onSubmit={handleRegister}>
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
        <Form.Control required pattern="[a-zA-Z0-9\s]+" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <Form.Control.Feedback type="invalid">
            Please provide a full username.
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control required type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <Form.Control.Feedback type="invalid">
            Please provide a password.
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formEmail">
      
       <Form.Label>email:</Form.Label> 
        <Form.Control required type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBirthDate">
     
       <Form.Label>birthdate:</Form.Label> 
        <Form.Control type="text" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
      
      </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
}
