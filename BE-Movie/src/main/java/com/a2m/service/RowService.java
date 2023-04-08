package com.a2m.service;

import com.a2m.entities.Rows;
import com.a2m.model.request.RowRequest;

public interface RowService {
    Rows createRow(RowRequest rowRequest);
}
