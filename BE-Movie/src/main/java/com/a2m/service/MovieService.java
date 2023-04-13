package com.a2m.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.entities.Movies;

@Service
public interface MovieService {
	
	Movies addMovie(Movies movies);

	Movies updateMovie(Movies movies);

	Movies deleteMovie(Movies movies);
	
	List<Movies> getListMovie();
	
}
