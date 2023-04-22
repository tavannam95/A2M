package com.a2m.repository;

import com.a2m.entities.SeatRows;
import com.a2m.entities.Seats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeatsRepository extends JpaRepository<Seats,Integer> {
    List<Seats> findByRow(SeatRows seatRows);
    @Query("SELECT s FROM Seats s WHERE s.row.id = :id")
    List<Seats> findByRow(int id);

}
