import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{director.Name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{director.Birth}</Card.Subtitle>
        <Card.Text>
          {director.Bio}
        </Card.Text>
        <Button onClick={() => { onBackClick(); }}>Back</Button>
      </Card.Body>
    </Card>
    );
  }
}
