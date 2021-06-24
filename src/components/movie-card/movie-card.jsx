// movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {
    const { movie, buttonFunction, text, disabled } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="mb-3 w-100">Open</Button>
          </Link>
          <Button disabled={disabled} className="mb-3 w-100" onClick={() => buttonFunction(movie._id)}>{text}</Button>
        </Card.Body>
      </Card>
    );
  }
};