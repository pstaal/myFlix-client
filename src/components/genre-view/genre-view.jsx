import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {

  render() {
    const { genre , onBackClick } = this.props;

    

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{genre.Name}</Card.Title>
        <Card.Text>
          {genre.Description}
        </Card.Text>
        <Button onClick={() => { onBackClick(); }}>Back</Button>
      </Card.Body>
    </Card>
    );
  }
}