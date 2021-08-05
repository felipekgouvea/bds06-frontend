package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieByGenreDTO;
import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;

	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private AuthService authService;
	
	@Transactional(readOnly = true)
	public Page<MovieByGenreDTO> findMovieByGenreId(Long genreId, Pageable pageable){
		authService.authenticated();
		Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);
		Page<Movie> page = repository.findMovieByGenreId(genre, pageable);
		return page.map(x -> new MovieByGenreDTO(x));
	}

	@Transactional(readOnly = true)
	public MovieDTO findById(Long id){
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Gênero não exite!"));
		return new MovieDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findReviewsToMovieById(Long movieId){
		User user = authService.authenticated();
		Movie movie = (movieId == 0) ? null : repository.getOne(movieId);
		List<Review> obj = reviewRepository.findReviewsToMovieById(movie);
		return obj.stream().map(x -> new ReviewDTO(x, user)).collect(Collectors.toList());
	}
}
