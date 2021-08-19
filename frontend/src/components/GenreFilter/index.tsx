import './styles.css';
import Select from 'react-select';
import { Genre } from '../../types/genre';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../util/requests';
import { AxiosRequestConfig } from 'axios';

export type GenreFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: GenreFilterData) => void;
};

const GenreFilter = ({ onSubmitFilter }: Props) => {
  const { handleSubmit, setValue, getValues, control } =
    useForm<GenreFilterData>();

  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/genres',
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setSelectGenres(response.data);
    });
  }, []);

  const onSubmit = (formData: GenreFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj: GenreFilterData = {
      genre: getValues('genre'),
    };

    onSubmitFilter(obj);
  };

  return (
    <div className="base-card movie-list-genre">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectGenres}
              classNamePrefix="movie-list-select"
              onChange={(value) => handleChangeGenre(value as Genre)}
              isClearable
              placeholder="Gênero"
              getOptionLabel={(genre: Genre) => genre.name}
              getOptionValue={(genre: Genre) => String(genre.id)}
            />
          )}
        />
      </form>
    </div>
  );
};

export default GenreFilter;
