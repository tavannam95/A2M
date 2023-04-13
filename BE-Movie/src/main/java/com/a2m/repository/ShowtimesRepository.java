package com.a2m.repository;

import com.a2m.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ShowtimesRepository extends JpaRepository<Showtimes,Long> {

    @Query("SELECT st FROM Showtimes st WHERE date(st.date) = :today")
    List<Showtimes> today(Date today);
}
