package com.a2m.repository;

import com.a2m.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ShowtimesRepository extends JpaRepository<Showtimes,Long> {
    List<Showtimes> findByDate(Date date);
}
