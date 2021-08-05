package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@PreAuthorize("hasAnyRole('MEMBER')")
	@Transactional
	public ReviewDTO insert(ReviewDTO dto){
		User user = authService.authenticated();

		Review review = new Review();
		review.setMovie(new Movie(dto.getMovieId()));
		review.setText(dto.getText());
		review.setUser(new User(user.getId()));
		review = repository.save(review);
		
		return new ReviewDTO(review, user);
	}

}
