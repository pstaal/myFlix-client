import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        birthdate:
        <input type="text" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};