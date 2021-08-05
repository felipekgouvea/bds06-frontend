package com.devsuperior.movieflix.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.GenreDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.services.GenreService;
import com.devsuperior.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/genres")
public class GenreController {
	
	@Autowired
	private UserService service;

	@Autowired
	private GenreService genreService;
	
	@GetMapping(value = "/profile")
	public ResponseEntity<UserDTO> getProfile(){
		UserDTO dto = service.getProfile();
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<GenreDTO>> findAll(){
		List<GenreDTO> list = genreService.findAll();
		return ResponseEntity.ok().body(list);
	}
}
