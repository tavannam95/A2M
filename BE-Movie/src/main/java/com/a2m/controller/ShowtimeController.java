package com.a2m.controller;

import com.a2m.entities.Movies;
import com.a2m.entities.Rooms;
import com.a2m.entities.Showtimes;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.RoomsRepository;
import com.a2m.repository.RowsRepository;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/showtime")
@AllArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    private final ShowtimesRepository showtimesRepository;

    private final RoomsRepository roomsRepository;

    @GetMapping("/today")
    public DataResponse<List<Showtimes>> today(){
        return new DataResponse<>(true,"Thành công",this.showtimeService.today());
    }

    @GetMapping("/getAllShowtimes")
    public DataResponse<List<Showtimes>> getAllShowtimes() throws ParseException{
        List<Showtimes> showtimes = this.showtimesRepository.findAll();
        return new DataResponse<>(true,"Thành công",showtimes);
    }
    @GetMapping("/getMoviesByDate")
    public DataResponse<List<Movies>> getMoviesByDate(@RequestParam Date date){
//        System.out.println(date);
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getMoviesByDate(date));
    }

    @GetMapping("/getAllRooms")
    public DataResponse<List<Rooms>> getAllRooms(){
        return new DataResponse<>(true,"Thành công",this.roomsRepository.findAll());
    }

    @GetMapping("/getShowTimeByDate")
    public DataResponse<List<Showtimes>> getShowtimeByDate(@RequestParam Date date, @RequestParam int id){
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getShowTimeByDate(date, id));
    }

    @PostMapping("/saveShowtimes")
    public DataResponse<Showtimes> saveShowtimes(@RequestBody Showtimes listShowtimes){
    	System.out.println(listShowtimes.getTimeStart());
    	System.out.println(listShowtimes.getTimeEnd());
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.save(listShowtimes));
    }
}
