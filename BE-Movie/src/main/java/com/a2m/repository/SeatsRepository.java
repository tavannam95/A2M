package com.a2m.repository;

import com.a2m.entities.Seats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatsRepository extends JpaRepository<Seats,Integer> {
}
