import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import breedRequest from "./httpRequest/breed";
import { useEffect, useState } from "react";
import CatList from "./components/Cats/CatList/Catlist";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [breedId, setBreedId] = useState(null);

  useEffect(() => {
    breedRequest.list().then((data) => setBreeds(data));
  }, []);

  const onChangeHandler = (e) => {
    setBreedId(e.target.value);
  };
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
            onChange={onChangeHandler}
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
          <CatList breedId={breedId} />
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
