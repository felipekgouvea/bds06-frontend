import { Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Auth from './page/Auth';
import MovieDetails from './page/MovieDetails';
import MovieList from './page/MovieList';
import history from '../src/util/history';
import PrivateRoute from '../src/components/PrivateRoute';

const Routes = () => (
  <Router history={history}>
    <NavBar />
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <PrivateRoute path="/">
        <Route path="/movies" exact>
          <MovieList />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
