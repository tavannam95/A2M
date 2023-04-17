package com.a2m.controller;

import com.a2m.entities.Showtimes;
import com.a2m.model.response.DataResponse;
import com.a2m.model.response.ShowtimeResponse;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/showtime")
@AllArgsConstructor
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    @GetMapping("/today")
    public DataResponse<List<ShowtimeResponse>> today(){
        return new DataResponse<>(true,"Thành công",this.showtimeService.today());
    }

    @GetMapping("/all-active")
    public DataResponse<List<ShowtimeResponse>> getAllShowtimeActive(){
        return new DataResponse<>(true, "Thành công", this.showtimeService.getAllShowtimeActive());
    }

    @GetMapping("/{idMovie}")
    public DataResponse<List<Showtimes>> findByMovie(@PathVariable("idMovie") Long idMovie){
        return new DataResponse<>(true,"Thành công", this.showtimeService.findByMovie(idMovie));
    }
}
