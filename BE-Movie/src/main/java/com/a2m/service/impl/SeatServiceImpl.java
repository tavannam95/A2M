package com.a2m.service.impl;

import com.a2m.entities.SeatTypes;
import com.a2m.entities.Seats;
import com.a2m.repository.SeatTypesRepository;
import com.a2m.repository.SeatsRepository;
import com.a2m.service.SeatService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class SeatServiceImpl implements SeatService {
    private SeatsRepository seatsRepository;

    private SeatTypesRepository seatTypesRepository;

    @Override
    public Seats changeSeatType(Integer seatId, SeatTypes seatTypes) {
        Seats seat = this.seatsRepository.findById(seatId).get();
        seat.setSeatType(seatTypes);
        return this.seatsRepository.save(seat);
    }
}
