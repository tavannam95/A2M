package com.a2m.repository;

import com.a2m.entities.MovieTimes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieTimesRepository extends JpaRepository<MovieTimes,Long> {
}
