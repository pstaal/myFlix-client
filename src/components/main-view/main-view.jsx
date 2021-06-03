import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'



export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
    this.onLoggedIn = this.onLoggedIn.bind(this);
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
        <Navbar defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/">All Movies</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">My Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">My favorite Movies</Nav.Link>
          </Nav.Item>
        </Navbar>

        <Row className="main-view justify-content-md-center">

        <Route exact path="/" render={() => {
            if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return movies.map(m => (
         <Col md={3} key={m._id}>
          <MovieCard movie={m} />
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

        </Row>
      </Router>
    );
  }
  
};
