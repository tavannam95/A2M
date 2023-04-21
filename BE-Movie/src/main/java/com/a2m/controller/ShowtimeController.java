package com.a2m.controller;

import com.a2m.entities.Showtimes;
import com.a2m.model.response.DataResponse;
import com.a2m.model.response.ShowtimeDateResponse;
import com.a2m.model.response.ShowtimeResponse;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/showtime")
@AllArgsConstructor
@Slf4j
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    private final ShowtimesRepository showtimesRepository;

    @GetMapping("/today")
    public DataResponse<List<ShowtimeResponse>> today(){
        return new DataResponse<>(true,"Thành công",this.showtimeService.today());
    }

    @GetMapping("/all-active")
    public DataResponse<List<ShowtimeResponse>> getAllShowtimeActive(){
        return new DataResponse<>(true, "Thành công", this.showtimeService.getAllShowtimeActive());
    }

    @GetMapping("/{idMovie}")
    public DataResponse<List<ShowtimeDateResponse>> findByMovie(@PathVariable("idMovie") Long idMovie){
        return new DataResponse<>(true,"Thành công", this.showtimeService.findByMovie(idMovie));
    }

    @PostMapping("/time/{idMovie}")
    public DataResponse<List<Showtimes>> getShowtimeByMovieAndDate(@PathVariable("idMovie") Long idMovie, @RequestBody String dateStr) throws Exception{
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        return new DataResponse<>(true,"Thành công", this.showtimeService.getShowtimeByMovieAndDate(idMovie,date));
    }

    @GetMapping("/id/{showtimeId}")
    public DataResponse<Showtimes> findById(@PathVariable("showtimeId") Long showtimeId){
        return new DataResponse<>(true,"Thành công", this.showtimesRepository.findById(showtimeId).get());
    }
}
