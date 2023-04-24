package com.a2m.service;

import com.a2m.entities.SeatTypes;
import com.a2m.entities.Seats;

public interface SeatService {
    Seats changeSeatType(Integer seatId, SeatTypes seatTypes);
}
