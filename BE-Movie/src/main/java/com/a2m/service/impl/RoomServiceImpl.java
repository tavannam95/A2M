package com.a2m.service.impl;

import com.a2m.entities.Rooms;
import com.a2m.entities.SeatTypes;
import com.a2m.entities.Seats;
import com.a2m.repository.RoomsRepository;
import com.a2m.repository.SeatTypesRepository;
import com.a2m.repository.SeatsRepository;
import com.a2m.service.RoomService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService {
    private RoomsRepository roomsRepository;

    private SeatsRepository seatsRepository;

    private SeatTypesRepository seatTypesRepository;

    @Override
    public Rooms createRoom(Rooms rooms) {
        Rooms room = this.roomsRepository.save(rooms);
        return room;
    }

    @Override
    public Rooms updateRoom(Rooms rooms) {
        Rooms room = this.roomsRepository.findById(rooms.getId()).get();
        room.setName(rooms.getName());
        return this.roomsRepository.save(room);
    }

    @Override
    public Rooms activeOrInactive(Rooms rooms) {
        Rooms room = this.roomsRepository.findById(rooms.getId()).get();
        room.setIsDelete(!room.getIsDelete());
        return this.roomsRepository.save(room);
    }
}
