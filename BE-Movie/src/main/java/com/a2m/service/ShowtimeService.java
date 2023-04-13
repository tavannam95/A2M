package com.a2m.service;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowtimeService {
    List<Showtimes> today();
    List<Showtimes> getAllShowtime();

    List<Movies> getMovieByDate();
}
