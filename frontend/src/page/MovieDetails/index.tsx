import './styles.css';
import ButtonIcon from '../../components/ButtonIcon';
import { ReactComponent as StarIcon } from '../../assets/images/star.svg';
import { useState, useEffect } from 'react';
import { Reviews } from '../../types/reviews';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../util/requests';
import { useHistory, useParams } from 'react-router-dom';
import { hasAnyRoles } from '../../util/auth';
import { useForm } from 'react-hook-form';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Reviews>();
  const [reviews, setReviews] = useState<Reviews[]>();
  const { movieId } = useParams<UrlParams>();  
  const history = useHistory();

  useEffect(() => {
    getReviews(movieId);
  }, [movieId]);

  const getReviews = (movieId: string) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response.data);
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

    requestBackend(config).then((response) => {
      getReviews(movieId);
      history.replace(`/movies`);      
      history.replace(`/movies/${movieId}`);      
    });
  };

  return (
    <div className="movie-details-container">
      <h1>Tela detalhes do filme id: {movieId}</h1>
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
            <div className="movie-details-card-comments">
              <StarIcon className="movie-details-card-comments-icon" />
              <h2>ANA</h2>
            </div>
            <div className="movie-details-comments">
              <p key={item.id}>{item?.text}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
