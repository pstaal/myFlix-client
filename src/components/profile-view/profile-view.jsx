import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Filter out favorite movies based on movies props
        const favMovies = this.props.movies.filter(item => {
          return response.data.FavoriteMovies.includes(item._id);
        })
        // Assign the result to the state
        this.setState({
          user: response.data,
          favoriteMovies: favMovies
        });
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

  removeFavorite = (id) => {
    let token = localStorage.getItem('token');
    console.log(id,token, this.state.user.Username);
    axios.delete(`https://whispering-journey-40194.herokuapp.com/users/${this.state.user.Username}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response.data);
      this.setState({favoriteMovies: this.state.favoriteMovies.filter((movie) => movie._id !== id)})
      })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {

    const { onBackClick, movies } = this.props;
    const { user, update, favoriteMovies } = this.state;
    
    if (!update) {
    return (
      <>
      { user && <div>
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
        <Button className="mb-3 w-100" onClick={() => { onBackClick(); }}>Back</Button>
        <Button className="mb-3 w-100" onClick={() => this.setState({ update : true })}>Update my profile</Button>
      </div> 
      <Row className="justify-content-md-center">
      {favoriteMovies.map(m => (
         <Col md={4} key={m._id}>
          <MovieCard movie={m} buttonFunction={this.removeFavorite} text={'Remove from Favorites'}/>
        </Col>))}
      </Row>
      </div>
      }
      </> 
    )
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
