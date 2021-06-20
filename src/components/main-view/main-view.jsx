import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      show: false
    };
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  addFavorite = (id) => {
    let token = localStorage.getItem('token');
    axios.post(`https://whispering-journey-40194.herokuapp.com/users/${this.state.user}/movies/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
      console.log(response.data);
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  deregister = () => {
    let token = localStorage.getItem('token');
    axios.delete(`https://whispering-journey-40194.herokuapp.com/users/${this.state.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response.data);
      this.logoutUser();
      })
    .catch(function (error) {
      console.log(error);
    });

  }


  getMovies(token) {
    axios.get('https://whispering-journey-40194.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  logoutUser() {
    localStorage.clear();
    this.setState({ user: null});
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  
  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <Navbar bg="primary" variant="dark" fixed="top">
          <Nav.Item>
            <Nav.Link style={{color: 'white'}} href="/">All Movies</Nav.Link>
          </Nav.Item>
          <Nav.Item className="ml-5">
            <Link style={{color: 'white', textDecoration: 'none'}} to={`/users/${user}`}>My Profile</Link>
          </Nav.Item>
          {user && <Nav.Item className="ml-5">
            <Nav.Link style={{color: 'white'}} onClick={this.logoutUser}>Logout</Nav.Link>
          </Nav.Item>}
          {!user && <Nav.Item className="ml-5">
            <Nav.Link style={{color: 'white'}} href="/register">Register</Nav.Link>
          </Nav.Item>}
          {user && <Nav.Item className="ml-5">
           <Nav.Link style={{color: 'white'}} onClick={() => this.setState({show:true})}>
              Deregister
          </Nav.Link>
          </Nav.Item>}
        </Navbar>

        <Modal
        show={this.state.show}
        onHide={() => this.setState({show:false})}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deregister</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you shure you want to deregister yourself?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({show:false})}>
            No!
          </Button>
          <Button onClick={this.deregister} variant="primary">Yes!</Button>
        </Modal.Footer>
      </Modal>

        <Row className="main-view justify-content-md-center">

        <Route exact path="/" render={() => {
            if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return movies.map(m => (
         <Col md={3} key={m._id}>
          <MovieCard buttonFunction={this.addFavorite} text={'Add to Favorites'} movie={m} />
        </Col>
      ))
      }} />
      <Route path="/register" render={() => {
        if (user) return <Redirect to="/" />
        return <Col>
          <RegistrationView />
        </Col>
      }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
           if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
          <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
            }
          } />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
            }
          } />
          <Route path="/users/:username" render={({ match, history }) => {
            if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
            <ProfileView logoutUser={this.logoutUser} user={match.params.username} movies={movies} onBackClick={() => history.goBack()}/>
          </Col>
            }
          } />

        </Row>
      </Router>
    );
  }
  
};
