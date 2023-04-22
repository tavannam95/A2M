package com.a2m.service.impl;

import com.a2m.entities.Rooms;
import com.a2m.entities.SeatRows;
import com.a2m.entities.Seats;
import com.a2m.model.request.RoomRequest;
import com.a2m.repository.RoomsRepository;
import com.a2m.repository.RowsRepository;
import com.a2m.repository.SeatTypesRepository;
import com.a2m.repository.SeatsRepository;
import com.a2m.service.RoomService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomService {

    private final List<String> listNameRow = Arrays.asList("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z");
    private RoomsRepository roomsRepository;

    private SeatsRepository seatsRepository;

    private RowsRepository rowsRepository;

    private SeatTypesRepository seatTypesRepository;

    @Override
    public Rooms createRoom(RoomRequest roomRequest) {
        Rooms rooms = this.roomsRepository.findById(roomRequest.getRoomId()).get();
        log.info("Room ID: {}", roomRequest.getRoomId());
        for (int i = 0; i < roomRequest.getData().size(); i++) {
            SeatRows s = new SeatRows();
            s.setName(roomRequest.getData().get(i).getName());
            s.setRoom(rooms);
            s.setIsDelete(false);
            SeatRows seatRows = this.rowsRepository.save(s);
            for (int j = 0; j < roomRequest.getData().get(i).getListSeats().size(); j++) {
                roomRequest.getData().get(i).getListSeats().get(j).setRow(seatRows);
                this.seatsRepository.save(roomRequest.getData().get(i).getListSeats().get(j));
            }
        }
        return rooms;
    }

    private SeatRows createSeatRow(Rooms rooms, String nameRow){
        SeatRows seatRows = new SeatRows();
        seatRows.setRoom(rooms);
        seatRows.setIsDelete(false);
        seatRows.setName(nameRow);
        return this.rowsRepository.save(seatRows);
    }

    private void createSeat(SeatRows seatRows,int number, int location){
        Seats seats = new Seats();
        seats.setNumber(number);
        seats.setLocation(location);
        seats.setSeatType(this.seatTypesRepository.findById(1).get());
        seats.setRow(seatRows);
        seats.setStatus(0);
        seats.setIsDelete(false);
        this.seatsRepository.save(seats);
    }

    private void createWay(SeatRows seatRows, int location){
        Seats seats = new Seats();
        seats.setLocation(location);
        seats.setSeatType(this.seatTypesRepository.findById(4).get());
        seats.setRow(seatRows);
        seats.setStatus(0);
        seats.setIsDelete(false);
        this.seatsRepository.save(seats);
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
