package com.a2m.service.impl;

import com.a2m.entities.Rooms;
import com.a2m.entities.SeatRows;
import com.a2m.entities.SeatTypes;
import com.a2m.entities.Seats;
import com.a2m.model.request.RowRequest;
import com.a2m.model.response.RowResponse;
import com.a2m.repository.RoomsRepository;
import com.a2m.repository.RowsRepository;
import com.a2m.repository.SeatTypesRepository;
import com.a2m.repository.SeatsRepository;
import com.a2m.service.RowService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class RowServiceImpl implements RowService {
    private RowsRepository rowsRepository;

    private SeatsRepository seatsRepository;

    private SeatTypesRepository seatTypesRepository;

    private RoomsRepository roomsRepository;

    @Override
    public SeatRows createRow(RowRequest rowRequest) {
        Rooms rooms = this.roomsRepository.findById(rowRequest.getRoomId()).get();
        SeatRows rows = new SeatRows();
        rows.setName(rowRequest.getName());
        rows.setIsDelete(false);
        rows.setRoom(rooms);

        SeatRows rowResponse = this.rowsRepository.save(rows);

        SeatTypes seatTypes = this.seatTypesRepository.findAll().get(0);
        for (int i = 0; i < rowRequest.getQuantitySeat(); i++) {
            Seats seats = new Seats();
            seats.setSeatType(seatTypes);
            seats.setNumber(i+1);
            seats.setRow(rowResponse);
            seats.setIsDelete(false);
            seats.setStatus(0);
            this.seatsRepository.save(seats);
        }

        return rowResponse;
    }

    @Override
    public List<RowResponse> findAllRowByRoom(Rooms rooms) {
        List<SeatRows> listSeatRows = this.rowsRepository.findByRoomAndIsDeleteOrderByNameAsc(rooms,false);
        List<RowResponse> listSeatRowResponse = new ArrayList<>();
        for (SeatRows seatRow: listSeatRows
             ) {
            List<Seats> seatsList = this.seatsRepository.findByRow(seatRow);
            RowResponse rowResponse = new RowResponse();
            rowResponse.setId(seatRow.getId());
            rowResponse.setName(seatRow.getName());
            rowResponse.setIsDelete(seatRow.getIsDelete());
            rowResponse.setListSeats(seatsList);
            listSeatRowResponse.add(rowResponse);
        }
        return listSeatRowResponse;
    }

    @Override
    public List<SeatRows> removeRowByRoom(Integer roomId) {
        Rooms rooms = this.roomsRepository.findById(roomId).get();
        List<SeatRows> listSeatRow = this.rowsRepository.findByRoomAndIsDeleteOrderByNameAsc(rooms,false);
        for (int i = 0; i < listSeatRow.size(); i++) {
            SeatRows seatRows = listSeatRow.get(i);
            seatRows.setIsDelete(true);
            this.rowsRepository.save(seatRows);
        }
        return listSeatRow;
    }

    @Override
    public SeatRows activeOrInactive(SeatRows seatRows) {
        SeatRows seatRow = this.rowsRepository.findById(seatRows.getId()).get();
        seatRow.setIsDelete(!seatRow.getIsDelete());
        return this.rowsRepository.save(seatRow);
    }

}
