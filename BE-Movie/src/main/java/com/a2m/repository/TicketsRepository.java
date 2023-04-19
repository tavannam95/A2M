package com.a2m.repository;

import com.a2m.entities.Showtimes;
import com.a2m.entities.Tickets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketsRepository extends JpaRepository<Tickets,Long> {
    List<Tickets> findByShowtime(Showtimes showtimes);
}
