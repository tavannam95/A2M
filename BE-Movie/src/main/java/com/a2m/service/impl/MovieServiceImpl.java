package com.a2m.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Movies;
import com.a2m.repository.MoviesRepository;
import com.a2m.service.MovieService;

@Service
public class MovieServiceImpl implements MovieService{
	
	@Autowired
	MoviesRepository moviesRepository;
	
	@Override
	public Movies addMovie(Movies movies) {
		return moviesRepository.save(movies);
	}

	@Override
	public Movies updateMovie(Movies movies) {
		
		return moviesRepository.save(movies);
	}

	@Override
	public Movies deleteMovie(Movies movies) {
		movies.setIsDelete(!movies.getIsDelete());
		return moviesRepository.save(movies);
	}

	@Override
	public List<Movies> getListMovie() {
		
		return moviesRepository.findAll();
	}
	
	
	
}
