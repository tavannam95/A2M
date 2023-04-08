package com.a2m.repository;

import com.a2m.entities.SeatRows;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RowsRepository extends JpaRepository<SeatRows, Integer> {
}
