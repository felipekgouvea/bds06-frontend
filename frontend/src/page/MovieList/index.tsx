import { Link } from 'react-router-dom';

import './styles.css';

const MovieList = () => {
  return (
    <div className="list-container">
      <h1>Tela listagem de filmes</h1>
      <Link to="/movies/1">
        <p>Acessar /movie/1</p>
      </Link>
      <Link to="/movies/2">
        <p>Acessar /movie/2</p>
      </Link>
    </div>
  );
};

export default MovieList;
