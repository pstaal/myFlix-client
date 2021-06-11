import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      favoriteMovies: [],
      update: false
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
      console.log(this.state.user);
    })
    .catch(function (error) {
      console.log(error);
    });
   }
    

  handleUpdate = (e) => {
    e.preventDefault();
    const { logoutUser } = this.props;
    console.log(this.state.user);
    axios.put(`https://whispering-journey-40194.herokuapp.com/users/${this.props.user}`, {
      Username: this.state.user.Username,
      Password: this.state.user.Password,
      Email: this.state.user.Email,
      Birthday: this.state.user.Birthday
    })
    .then(response => {
      console.log(response.data);
      this.setState({ update: false });
    })
    .catch(function (error) {
      console.log(error);
    })
    logoutUser();
  }


  render() {

    const { onBackClick, movies } = this.props;
    const { user, update } = this.state;
    console.log(user);
    //console.log(user.FavoriteMovies);

    //const favoritesArray = movies.filter((movie) => user.FavoriteMovies.indexOf(movie._id) !== -1);
   // console.log(favoritesArray);

    
    if (!update) {
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
        <Button variant="link" onClick={() => this.setState({ update : true })}>Update my profile</Button>
      </div> 
      }
      
      </>
    );
    }
    else {
      return (
        <Form>
          <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={user.Username} onChange={e => this.setState({ user: {
            ...this.state.user,
            Username: e.target.value
          }})} />
          </Form.Group>

          <Form.Group controlId="formPassword">
          <Form.Label>password:</Form.Label>
            <Form.Control type="text" onChange={e => this.setState({ user: {
            ...this.state.user,
            Password: e.target.value
          }})} />
          </Form.Group>
          
          <Form.Group controlId="formEmail">
          
           <Form.Label>email:</Form.Label> 
            <Form.Control type="text" value={user.Email} onChange={e => this.setState({ user: {
            ...this.state.user,
            Email: e.target.value
          }})} />
         
          </Form.Group>
          <Form.Group controlId="formBirthDate">
         
           <Form.Label>birthdate:</Form.Label> 
            <Form.Control type="text" value={user.Birthday} onChange={e => this.setState({ user: {
            ...this.state.user,
            Birthday: e.target.value
          }})} />
          
          </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleUpdate}>Update my profile</Button>
        </Form>
      );


    }
  }
}
