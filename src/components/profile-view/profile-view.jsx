import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { connect } from 'react-redux';
import { setUser, removeFavorite } from '../../actions/actions';

class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      update: false
    };
  }

  componentDidMount = () => {
    this.getUser();
  }


  getUser = () => {
    console.log('------');
    console.log(this.props);
    console.log('------');
    let token = localStorage.getItem('token');
    axios.get(`https://whispering-journey-40194.herokuapp.com/users/${this.props.state.userState.userName}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response)
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  handleUpdate = (e) => {
    e.preventDefault();
    const { logoutUser } = this.props;
    console.log(this.state.user);
    axios.put(`https://whispering-journey-40194.herokuapp.com/users/${this.props.state.userState.userName}`, {
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
    console.log(id, token, this.state.user.Username);
    axios.delete(`https://whispering-journey-40194.herokuapp.com/users/${this.props.state.userState.Username}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response.data);
      this.props.removeFavorite(id);
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {

    const { onBackClick, state } = this.props;
    const { update } = this.state;

    let date;

    if (state.userState) {
      date = new Date(state.userState.Birthday);
      date = date.toLocaleDateString();
      date = date.split(' ')[0];
    };

    if (!update) {
      return (
        <>
          {state.userState && <div>
            <div>
              <div class="d-flex flex-row mb-6">
                <h3 className="value">{state.userState.Username}</h3>
                <p className="value ml-4 pt-2">Email: {state.userState.Email}</p>
                <p className="value ml-4 pt-2">Birthdate: {date}</p>
              </div>
              <Button className="mb-3 w-100" onClick={() => { onBackClick(); }}>Back</Button>
              <Button className="mb-3 w-100" onClick={() => this.setState({ update: true })}>Update my profile</Button>
            </div>
            <Row className="justify-content-md-center">
              {state.userState.favoriteMovies.map(m => (
                <Col md={4} key={m._id}>
                  <MovieCard movie={m} buttonFunction={this.removeFavorite} text={'Remove from Favorites'} />
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
            <Form.Control type="text" value={state.userState.Username} onChange={e => this.setState({
              user: {
                ...this.state.user,
                Username: e.target.value
              }
            })} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>password:</Form.Label>
            <Form.Control type="text" onChange={e => this.setState({
              user: {
                ...this.state.user,
                Password: e.target.value
              }
            })} />
          </Form.Group>

          <Form.Group controlId="formEmail">

            <Form.Label>email:</Form.Label>
            <Form.Control type="text" value={state.userState.Email} onChange={e => this.setState({
              user: {
                ...this.state.user,
                Email: e.target.value
              }
            })} />

          </Form.Group>
          <Form.Group controlId="formBirthDate">

            <Form.Label>birthdate:</Form.Label>
            <Form.Control type="text" value={state.userState.Birthday} onChange={e => this.setState({
              user: {
                ...this.state.user,
                Birthday: e.target.value
              }
            })} />

          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleUpdate}>Update my profile</Button>
        </Form>
      );


    }
  }
}

let mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setUser,
  removeFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);