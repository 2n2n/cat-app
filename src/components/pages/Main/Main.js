import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import breedsRequest from "../../../httpRequest/breeds";
import CatList from "../../Cats/CatList/Catlist";
import imageRequest from "../../../httpRequest/images";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";
import PageContainer from "../../PageContainer/PageContainer";
import { useParams, useLocation } from 'react-router-dom';
import { getParameterByName } from '../../../utils/url-utils';

const REQUEST_LIMIT = 10;

function App() {
  const [isLoading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [list, setList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [page, setPage] = useState(0);
  const { search } = useLocation();

  useEffect(() => {
    console.log(getParameterByName('breed', search));
    breedsRequest
      .list()
      .then((data) => {
        let searchParam = getParameterByName('breed', search);
        setBreeds(data);
        if (searchParam != null) {
          let selected = data.find(breed => breed.id === searchParam);
          setSelectedBreed(selected);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(0);
  }, [selectedBreed]);

  useEffect(() => {
    setLoading(true);
    if (selectedBreed == null) return;
    imageRequest
      .search(selectedBreed.id, REQUEST_LIMIT, page)
      .then((data) => {
        if (data.length < 1) {
          setLastPage(true);
        }
        if (page === 0) {
          // if page is still 1, first time load.
          setList(data);
        } else {
          setList((prevState) => [...prevState, ...data]);
        }
      })
      .finally(() => setLoading(false));
  }, [selectedBreed, page]);

  const onSelectBreedHandler = (e) =>
    setSelectedBreed(breeds.find((data) => data.id === e.target.value));

  const onLoadMoreHandler = () => {
    setPage((prevState) => prevState + 1);
  };
  return (
    <PageContainer className="Home">
      <h1>Cat Browser</h1>
      <Row style={{ padding: "10px 0px" }}>
        <Col className="col-md-3 col-sm-6 col-12">
          <Form.Group>
            <Form.Label>Breed</Form.Label>
            <Form.Select
              value={selectedBreed?.id}
              onChange={onSelectBreedHandler}
              name="breed"
              disabled={isLoading}
            >
              <option value={null}>Select Breed</option>
              {breeds.map((breed, key) => (
                <option key={key} value={breed.id}>
                  {breed.name}
                </option>
              ))}
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
            <Button
              disabled={isLoading || selectedBreed === null}
              onClick={onLoadMoreHandler}
              variant="success"
            >
              {isLoading ? "Loading cats..." : "Load More"}
            </Button>
          </Col>
        </Row>
      )}
    </PageContainer>
  );
}

export default App;
