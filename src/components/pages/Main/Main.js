import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../../App.css";
import breedsRequest from "../../../httpRequest/breeds";
import { useEffect, useState } from "react";
import CatList from "../../Cats/CatList/Catlist";
import imageRequest from '../../../httpRequest/images';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [list, setList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    breedsRequest.list().then((data) => setBreeds(data));
  }, []);

  useEffect(() => {
    if (selectedBreed == null) return;
    imageRequest.search(selectedBreed.id, 10, 1).then((data) => setList(data));
  }, [selectedBreed]);

  const onSelectBreedHandler = (e) =>
    setSelectedBreed(breeds.find((data) => data.id === e.target.value));

  return (
    <Container>
      <Row>
        <Col>
          <h1>Cat Browser</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Breed</div>
          <select
            onChange={onSelectBreedHandler}
            name="breed"
            disabled={breeds.length < 1}
          >
            {breeds.length < 1 ? (
              <option name="">Select Breed</option>
            ) : (
              breeds.map((breed) => (
                <option value={breed.id}>{breed.name}</option>
              ))
            )}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <CatList breeds={list} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="success">Success</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
