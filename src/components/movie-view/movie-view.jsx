import React from 'react';
import PropTypes from 'prop-types';
import './Movie-view.scss';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <h5 className="value">{movie.Title}</h5>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="mt-3 mb-3 w-100">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="mb-3 w-100">Genre</Button>
        </Link>
        <Button className="mb-3 w-100" onClick={() => { onBackClick(); }}>Back</Button>

      </div>
    );
  }
}

