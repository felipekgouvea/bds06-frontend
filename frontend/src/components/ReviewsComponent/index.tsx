import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/images/star.svg';
import { Reviews } from '../../types/reviews';
import { requestBackend } from '../../util/requests';


type UrlParams = {
  movieId: string;
};

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState<Reviews[]>();
  const { movieId } = useParams<UrlParams>();

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

  return (
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
  );
};

export default ReviewsComponent;
