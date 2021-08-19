import './styles.css';
import { SpringPage } from '../../types/vendor/spring';
import MovieCard from '../../components/MovieCard';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../util/requests';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movies } from '../../types/movies';
import Pagination from '../../components/Pagination';
import GenreFilter, { GenreFilterData } from '../../components/GenreFilter';

type ControlComponentData = {
  activePage: number;
  filterData: GenreFilterData;
};

const MovieList = () => {
  const [page, setPage] = useState<SpringPage<Movies>>();

  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData({
      activePage: pageNumber,
      filterData: controlComponentData.filterData,
    });
  };

  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponentData({
      activePage: 0,
      filterData: data,
    });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        page: controlComponentData.activePage,
        size: 4,
        genreId: controlComponentData.filterData.genre?.id,
      },
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movie-list-container">
      <GenreFilter onSubmitFilter={handleSubmitFilter} />
      <div className="row">
        {page?.content.map((movies) => (
          <div className="col-sm-6 col-xl-3" key={movies.id}>
            <Link to={`/movies/${movies.id}`}>
              <MovieCard movie={movies} />
            </Link>
          </div>
        ))}
      </div>
      <div className="movie-list-pagination">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>      
    </div>
  );
};

export default MovieList;
