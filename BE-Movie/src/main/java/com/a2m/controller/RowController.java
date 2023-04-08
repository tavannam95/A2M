package com.a2m.controller;

import com.a2m.entities.SeatRows;
import com.a2m.model.request.RowRequest;
import com.a2m.model.response.DataResponse;
import com.a2m.service.RowService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/row")
@AllArgsConstructor
public class RowController {

    private RowService rowService;

    @PostMapping("")
    public DataResponse<SeatRows> create(@RequestBody RowRequest rowRequest){
        return new DataResponse<>(true,"Thêm hàng ghế thành công", this.rowService.createRow(rowRequest));
    }
}
