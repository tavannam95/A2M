package com.a2m.repository;

import com.a2m.entities.Rooms;
import com.a2m.entities.SeatRows;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RowsRepository extends JpaRepository<SeatRows, Integer> {
    List<SeatRows> findByRoomAndIsDeleteOrderByNameAsc(Rooms rooms,Boolean isDelete);
}
