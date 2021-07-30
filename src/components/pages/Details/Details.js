import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagesRequest from "../../../httpRequest/images";
import PageContainer from "../../PageContainer/PageContainer";

const Details = () => {
  const { catId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    imagesRequest
      .get(catId)
      .then((data) => setData(data))
      .finally(() => setIsLoading(false));
  }, [catId]);

  return (
    <PageContainer className="Cat">
      <Row>
        <Col>
          {isLoading || data == null ? (
            <h3>Loading...</h3>
          ) : (
            <Card>
              <Card.Header>
                <Button type="primary" href={`/?breed=${data.breeds[0].id}`}>
                  Back
                </Button>
              </Card.Header>
              <Card.Img variant="top" src={data.url} />
              <Card.Body>
                <h4>{data.breeds[0].name}</h4>
                <h5>Origin: {data.breeds[0].origin}</h5>
                <h6>{data.breeds[0].temperament}</h6>
                <p>{data.breeds[0].description}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Details;
