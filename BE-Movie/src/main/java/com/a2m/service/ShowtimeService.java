package com.a2m.service;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import com.a2m.model.response.ShowtimeResponse;

import java.util.List;

public interface ShowtimeService {
    List<ShowtimeResponse> today();

    List<ShowtimeResponse> getAllShowtimeActive();

    List<Showtimes> findByMovie(Long idMovie);
}
