package com.a2m.service;

import com.a2m.entities.SeatRows;
import com.a2m.model.request.RowRequest;

public interface RowService {
    SeatRows createRow(RowRequest rowRequest);
}
