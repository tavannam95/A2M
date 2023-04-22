package com.a2m.service;

import com.a2m.entities.Rooms;
import com.a2m.entities.SeatRows;
import com.a2m.model.request.RowRequest;
import com.a2m.model.response.RowResponse;

import java.util.List;

public interface RowService {
    SeatRows createRow(RowRequest rowRequest);

    List<RowResponse> findAllRowByRoom(Rooms rooms);

    List<SeatRows> removeRowByRoom(Integer roomId);

    SeatRows activeOrInactive(SeatRows seatRows);
}
