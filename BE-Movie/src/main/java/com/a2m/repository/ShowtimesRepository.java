package com.a2m.repository;

import com.a2m.entities.Showtimes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowtimesRepository extends JpaRepository<Showtimes,Long> {
}
