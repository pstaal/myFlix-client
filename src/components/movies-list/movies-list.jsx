// src/components/movies-list/movies-list.jsx

import React, { Fragment } from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import axios from 'axios';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';
import { addFavorite } from '../../actions/actions';

function MoviesList(props) {

  const addFavoriteMovie = (id) => {
    let token = localStorage.getItem('token');
    // console.log('favorite successful*****');
    axios.post(`https://whispering-journey-40194.herokuapp.com/users/${props.userState.Username}/movies/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      // return response.data
      props.addFavorite(response.data.FavoriteMovies);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  const { movies, visibilityFilter, text, userState } = props;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;
  return <Fragment>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>

    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard filteredMovies={filteredMovies} buttonFunction={addFavoriteMovie} text={text} movie={m} />
      </Col>
    ))}
  </Fragment>;

}

const mapStateToProps = state => {
  const { visibilityFilter, movies, userState } = state;
  return {
    visibilityFilter,
    movies,
    userState
  };
};


export default connect(mapStateToProps, { addFavorite })(MoviesList);