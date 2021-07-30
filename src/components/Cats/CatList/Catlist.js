import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CatList = ({ breeds }) => {
  let component;
  const history = useHistory();

  const onClickHandler = (cat) => {
    history.push(`/${cat.id}`);
  };
    if (breeds.length < 1) {
      component = (
        <Col className="col-12" style={{ marginBottom: "20px" }}>
          No cats available
        </Col>
      );
    }
    else {
      component = breeds.map((cat, idx) => (
          <div key={idx} className="col-md-3 col-sm-6 col-12">
            <Card>
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
        ))
  }

    return (
      <Row>
        { component }
      </Row>
    );
}

export default CatList;