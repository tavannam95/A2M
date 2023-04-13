package com.a2m.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Movies;
import com.a2m.repository.MoviesRepository;
import com.a2m.service.MovieService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {

	@Autowired
	MovieService movieService;
	
	@Autowired
	MoviesRepository moviesRepository;
	
	@GetMapping(value = "/listMovie")
	List<Movies> getList(){
		return movieService.getListMovie();
	}
	
	@GetMapping(value = "/{id}")
	Movies getMovie(@PathVariable("id") Long id){
		return moviesRepository.findById(id).get();
	}
	
	@PostMapping(value = "/addMovie")
	Movies addMovie(@RequestBody Movies movies) {
		return movieService.addMovie(movies);
	}

	@PutMapping(value = "/updateMovie")
	Movies updateMovie(@RequestBody Movies movies) {
		return movieService.updateMovie(movies);
	}

	@PutMapping(value = "/deleteMovie")
	Movies deleteMovie(@RequestBody Movies movies) {
		return movieService.deleteMovie(movies);
	}
	
	
}
