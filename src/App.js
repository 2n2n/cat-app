import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Container } from 'react-bootstrap';
import Main from './components/pages/Main/Main';
import Details from './components/pages/Details/Details';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div class="Home">
      <Container>
        <Router>
          <Switch>
            <Route path="/:catId">
              <Details />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
