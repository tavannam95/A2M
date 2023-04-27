package com.a2m.controller;

import com.a2m.entities.*;
import com.a2m.model.request.BillRequest;
import com.a2m.model.response.DataResponse;
import com.a2m.model.response.RowResponse;
import com.a2m.model.response.ShowtimeDateResponse;
import com.a2m.model.response.ShowtimeResponse;
import com.a2m.repository.FareRepository;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.BillService;
import com.a2m.service.RowService;
import com.a2m.service.ShowtimeService;
import com.a2m.service.TickeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/public/api/v1")
@AllArgsConstructor
public class PublicController {

    private BillService billService;
    private TickeService tickeService;
    private final ShowtimeService showtimeService;
    private FareRepository fareRepository;
    private RowService rowService;
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

    @PostMapping("/row-of-room")
    public DataResponse<List<RowResponse>> getByRoom(@RequestBody Rooms rooms){
        return new DataResponse<>(true,"Thành công",this.rowService.findAllRowByRoom(rooms));
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

    @GetMapping("/fare/{isHoliday}")
    public DataResponse<List<Fares>> findByIsHoliday(@PathVariable("isHoliday") Boolean isHoliday){
        return new DataResponse<>(true,"Thành công", this.fareRepository.findByIsHoliday(isHoliday));
    }

    @GetMapping("/showtime/{showtimeId}")
    public DataResponse<List<Tickets>> findByShowtime(@PathVariable("showtimeId") Long showtimeId){
        return new DataResponse<>(true,"Thành công",this.tickeService.findByShowtime(showtimeId));
    }

    @PostMapping("/create")
    DataResponse<Bills> create(@RequestBody BillRequest billRequest){
        return new DataResponse<>(true,"Đặt vé thành công",this.billService.createBill(billRequest));
    }


}
