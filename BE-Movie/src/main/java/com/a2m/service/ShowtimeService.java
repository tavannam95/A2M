package com.a2m.service;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import com.a2m.model.response.ShowtimeDateResponse;
import com.a2m.model.response.ShowtimeResponse;

import java.util.Date;
import java.util.List;

public interface ShowtimeService {
    List<Showtimes> getAllShowtime();

    List<Movies> getMovieByDate(Date date);

    List<Showtimes> getShowTimeByDate(Date date, Long id);
    
//    List<Showtimes> getShowtimesByDate(String date);

    List<ShowtimeResponse> today();

    List<ShowtimeResponse> getAllShowtimeActive();

    List<ShowtimeDateResponse> findByMovie(Long idMovie);

    List<Showtimes> getShowtimeByMovieAndDate(Long idMovie, Date date);

//	List<Showtimes> getShowTimeByDate(Date date, Long id);

//	List<ShowtimeResponse> today();

}
