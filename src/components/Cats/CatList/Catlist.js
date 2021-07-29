import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import breedRequest from '../../../httpRequest/breed';
const CatList = ({ breedId }) => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
      if (breedId == null) return;
      breedRequest.search(breedId).then((data) => setCats(data));
    }, [breedId]);

    if (cats.length < 1) {
        return "No cats available";
    }

    return (
      <>
        {cats.map((cat) => (
            <Card key={cat.id} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={ cat.url } />
                <Card.Body>
                <Button block variant="primary">View Details</Button>
                </Card.Body>
          </Card>
        ))}
      </>
    );
}

export default CatList;