package com.a2m.repository;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ShowtimesRepository extends JpaRepository<Showtimes,Long> {

    @Query("SELECT st FROM Showtimes st WHERE date(st.date) = :today")
    List<Showtimes> today(Date today);

    @Query("select st from Movies st  where date(st.endDate) >= :date")
    List<Movies> getMoviesByDate(Date date);

    @Query("select st from Showtimes  st where date(st.date) = :date and (st.rooms.id) = :id")
    List<Showtimes> getShowTimeByDate(Date date, int id);
}
