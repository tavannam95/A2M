package com.a2m.controller;

import com.a2m.entities.Showtimes;
import com.a2m.model.response.DataResponse;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/showtime")
@AllArgsConstructor
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    @GetMapping("/today")
    public DataResponse<List<Showtimes>> today(){
        return new DataResponse<>(true,"Thành công",this.showtimeService.today());
    }
}
