import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import imagesRequest from "../../../httpRequest/images";

const Details = () => {
  const { catId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    imagesRequest
      .get(catId)
      .then((data) => setData(data))
      .finally(() => setIsLoading(false));
  }, [catId]);

  const onGoBackHandler = () => history.goBack();

  return (
    <Container>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Card>
          <Card.Header>
            <Button type="primary" onClick={onGoBackHandler}>
              Back
            </Button>
          </Card.Header>
          <Card.Img variant="top" src={data.url} />
          <Card.Body>
            <h4>{data.breeds[0].name}</h4>
            <h5>Origin: {data.breeds[0].origin}</h5>
            <h6>{data.breeds[0].temparament}</h6>
            <p>{data.breeds[0].description}</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Details;
