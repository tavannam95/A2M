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

import java.util.ArrayList;
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
        Rooms room = new Rooms();
        room.setName(roomRequest.getName());
        room.setIsDelete(false);
        Rooms roomResponse = this.roomsRepository.save(room);
        for (int i = 0; i < roomRequest.getQuantityRow(); i++) {
            SeatRows seatRows = this.createSeatRow(roomResponse,listNameRow.get(i));
            boolean checkWay = false;
            for (int j = 0; j < roomRequest.getQuantitySeat()+1; j++) {
                if ((j+1)==roomRequest.getWay()){
                    this.createWay(seatRows,j+1);
                    checkWay = true;
                }else if (checkWay){
                    this.createSeat(seatRows,j,j+2);
                }else {
                    this.createSeat(seatRows,j+1,j+1);
                }

            }
        }
        return room;
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
