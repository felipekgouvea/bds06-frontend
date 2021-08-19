import './styles.css';
import { Movies } from '../../types/movies';

type Props = {
  movie: Movies;
};

const MovieCard = ({ movie }: Props ) => {
  return (
    <div className="base-card movie-list-content">
      <img src={movie.imgUrl} alt={movie.title} />
      <div className="movie-list-text">
        <h1>{movie.title}</h1>
        <h2>{movie.year}</h2>
        <h3>{movie.subTitle}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
