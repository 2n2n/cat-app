import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import breedsRequest from "../../../httpRequest/breeds";
import CatList from "../../Cats/CatList/Catlist";
import imageRequest from "../../../httpRequest/images";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";

const REQUEST_LIMIT = 2;

function App() {
  const [breeds, setBreeds] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [list, setList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    breedsRequest.list().then((data) => setBreeds(data));
  }, []);

  useEffect(() => {
    if (selectedBreed == null) return;
    imageRequest.search(selectedBreed.id, REQUEST_LIMIT, page).then((data) => {
      if (data.length < 1) {
        setLastPage(true);
      }
      if (page === 0) {
        // if page is still 1, first time load.
        setList(data);
      } else {
        setList((prevState) => [...prevState, ...data]);
      }
    });
  }, [selectedBreed, page]);

  const onSelectBreedHandler = (e) =>
    setSelectedBreed(breeds.find((data) => data.id === e.target.value));

  const onLoadMoreHandler = () => {
    setPage((prevState) => prevState + 1);
  };
  return (
    <div class="Home">
      <Container>
        <h1>Cat Browser</h1>
        <Row style={{ padding: "10px 0px" }}>
          <Col className="col-md-3 col-sm-6 col-12">
            <Form.Group>
              <Form.Label>Breed</Form.Label>
              <Form.Select
                onChange={onSelectBreedHandler}
                name="breed"
                disabled={breeds.length < 1}
              >
                {breeds.length < 1 ? (
                  <option name="">Select Breed</option>
                ) : (
                  breeds.map((breed, key) => (
                    <option key={key} value={breed.id}>
                      {breed.name}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <CatList breeds={list} />
          </Col>
        </Row>
        {!lastPage && (
          <Row>
            <Col>
              <Button onClick={onLoadMoreHandler} variant="success">
                Load More
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
