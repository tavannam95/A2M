package com.a2m.repository;

import com.a2m.entities.Rooms;
import com.a2m.entities.SeatRows;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RowsRepository extends JpaRepository<SeatRows, Integer> {
    List<SeatRows> findByRoomAndIsDeleteOrderByNameAsc(Rooms rooms,Boolean isDelete);

    @Query("UPDATE SeatRows s SET s.isDelete = true WHERE s.room.id = :roomId")
    void updateByRoom(Integer roomId);
}
