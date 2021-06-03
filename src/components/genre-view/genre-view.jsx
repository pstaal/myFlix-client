import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {

  render() {
    const { genre , onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <Button variant="link" onClick={() => { onBackClick(); }}>Back</Button>

      </div>
    );
  }
}