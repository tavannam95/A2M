package com.a2m.service.impl;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import com.a2m.model.response.ShowtimeDateResponse;
import com.a2m.model.response.ShowtimeResponse;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ShowtimeServiceImpl implements ShowtimeService {
    private ShowtimesRepository showtimesRepository;

    @Override
    public List<ShowtimeResponse> today() {
        Date today = new Date();
        return this.showtimesRepository.today(today);
    }

    @Override
    public List<ShowtimeResponse> upcomingMovie() {
        return this.showtimesRepository.upcomingMovie();
    }

    @Override
    public List<Showtimes> getAllShowtime() {
        return this.showtimesRepository.findAll();
    }

//    @Override
//    public List<Movies> getMovieByDate(Date date) {
//        return this.showtimesRepository.getMoviesByDate(date);
//    }

    @Override
    public List<Showtimes> getShowTimeByDate(Date date, int id) {
        return this.showtimesRepository.getShowTimeByDate(date, id);
    }

    public List<ShowtimeResponse> getAllShowtimeActive() {
        return this.showtimesRepository.getAllShowtimeActive();
    }

    @Override
    public List<ShowtimeDateResponse> findByMovie(Long idMovie) {
        Date today = new Date();
        return this.showtimesRepository.findByMovie(idMovie, today);
    }

//    @Override
//    public List<Showtimes> getShowtimeByMovieAndDate(Long idMovie, Date date) {
//        return this.showtimesRepository.getShowtimeByMovieAndDate(idMovie,date);
//    }

	@Override
	public List<Movies> getMovieByDate(Date date) {
		return this.showtimesRepository.getMoviesByDate(date);
	}

@Override
public List<Showtimes> getShowtimeByMovieAndDate(Long idMovie, Date date) {
	return this.showtimesRepository.getShowtimeByMovieAndDate(idMovie,date);
}
}
