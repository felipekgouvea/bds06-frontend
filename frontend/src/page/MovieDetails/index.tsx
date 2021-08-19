import './styles.css';
import ButtonIcon from '../../components/ButtonIcon';
import { useState, useEffect } from 'react';
import { Reviews } from '../../types/reviews';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../util/requests';
import { useParams } from 'react-router-dom';
import { hasAnyRoles } from '../../util/auth';
import { useForm } from 'react-hook-form';
import { Movies } from '../../types/movies';
import { ReactComponent as StarIcon } from '../../assets/images/star.svg';
import { toast } from 'react-toastify';
import CardLoader from '../../components/CardLoader';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Reviews>();
  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<Movies>();
  const [reviews, setReviews] = useState<Reviews[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReviews(movieId);
  }, [movieId]);

  const getReviews = (movieId: string) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setReviews(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMovies(movieId);
  }, [movieId]);

  const getMovies = (movieId: string) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = (formData: Reviews) => {
    const data = { ...formData, movieId };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        toast.success('Review inserido com sucesso');
        getReviews(movieId);
        setValue('text', '');
      })
      .catch(() => {
        toast.error('Error ao inserir o review');
      });
  };

  return (
    <div className="movie-details-container">
      {isLoading ? (
        <CardLoader />
      ) : (
        <div className="base-card movie-details-content">
          <div className="movie-details-img-container">
            <img src={movie?.imgUrl} alt={movie?.title} />
          </div>
          <div className="movie-details-title-container">
            <div className="movie-details-title">
              <h1>{movie?.title}</h1>
              <h2>{movie?.year}</h2>
              <h3>{movie?.subTitle}</h3>
            </div>
            <div className="movie-details-title-comments">
              {movie?.synopsis}
            </div>
          </div>
        </div>
      )}
      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="base-card movie-details-card">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="movie-details-form-container"
          >
            <div className="mb-4">
              <input
                {...register('text', {
                  required: 'Campo Obrigatório',
                })}
                type="text"
                className={`form-control base-input movie-details-input ${
                  errors.text ? 'is-invalid' : ''
                }`}
                placeholder="Deixe sua avaliação aqui"
                name="text"
              />
              <div className="invalid-feedback d-block">
                {errors.text?.message}
              </div>
            </div>
            <div className="movie-details-submit">
              <ButtonIcon text="Salvar Avaliação" />
            </div>
          </form>
        </div>
      )}
      <div className="base-card movie-details-card">
        {reviews?.map((item) => (
          <>
            <div className="movie-details-card-comments" key={item.id}>
              <StarIcon className="movie-details-card-comments-icon" />
              <h2>{item.user.name}</h2>
            </div>
            <div className="movie-details-comments">
              <p>{item?.text}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
