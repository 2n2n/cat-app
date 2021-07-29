import React from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CatList = ({ breeds }) => {
  const history = useHistory();

  const onClickHandler = (cat) => {
    history.push(`/${cat.id}`);
  };
    if (breeds.length < 1) {
      return "No cats available";
    }

    return (
      <Row>
        {breeds.map((cat, idx) => (
          <div className="col-md-3 col-sm-6 col-12">
            <Card key={idx}>
              <Card.Img variant="top" src={cat.url} />
              <Card.Body>
                <Button
                  style={{ width: "100%" }}
                  size="md"
                  variant="primary"
                  onClick={() => onClickHandler(cat)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    );
}

export default CatList;