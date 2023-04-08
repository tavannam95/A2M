package com.a2m.service.impl;

import com.a2m.entities.Rows;
import com.a2m.entities.SeatTypes;
import com.a2m.entities.Seats;
import com.a2m.model.request.RowRequest;
import com.a2m.repository.RowsRepository;
import com.a2m.repository.SeatTypesRepository;
import com.a2m.repository.SeatsRepository;
import com.a2m.service.RowService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RowServiceImpl implements RowService {
    private RowsRepository rowsRepository;

    private SeatsRepository seatsRepository;

    private SeatTypesRepository seatTypesRepository;

    @Override
    public Rows createRow(RowRequest rowRequest) {
        Rows rows = new Rows();
        rows.setName(rowRequest.getName());
        rows.setIsDelete(false);
        Rows rowResponse = this.rowsRepository.save(rows);

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
}
