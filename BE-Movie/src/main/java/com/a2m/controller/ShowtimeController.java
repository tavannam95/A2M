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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.a2m.model.response.ShowtimeDateResponse;
import com.a2m.model.response.ShowtimeResponse;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/showtime")
@Slf4j
public class ShowtimeController {

	@Autowired
    private ShowtimeService showtimeService;

	@Autowired
    private ShowtimesRepository showtimesRepository;

	@Autowired
    private RoomsRepository roomsRepository;


    @GetMapping("/today")
    public DataResponse<List<ShowtimeResponse>> today(){
        return new DataResponse<>(true,"Thành công",this.showtimeService.today());
    }


    @GetMapping("/getAllShowtimes")
    public DataResponse<List<Showtimes>> getAllShowtimes(){
        List<Showtimes> showtime = this.showtimesRepository.findAll1();
        List<Showtimes> showtimes = new ArrayList<>();
        for(Showtimes s: showtime) {
        	if(s.getIsDelete() == false) {
        		showtimes.add(s);
        	}
        }
        return new DataResponse<>(true,"Thành công",showtimes);
    }
    @GetMapping("/getMoviesByDate")
    public DataResponse<List<Movies>> getMoviesByDate(@RequestParam String date) throws ParseException{
//        System.out.println(date);
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	    java.util.Date parsedDate = format.parse(date);
	    Date dateInput = new Date(parsedDate.getTime());
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getMoviesByDate(dateInput));
    }

    @GetMapping("/getAllRooms")
    public DataResponse<List<Rooms>> getAllRooms(){
        return new DataResponse<>(true,"Thành công",this.roomsRepository.findAll());
    }

    @GetMapping("/getShowTimeByDate")
    public DataResponse<List<Showtimes>> getShowtimeByDate(@RequestParam String date, @RequestParam int id) throws ParseException{
    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	    java.util.Date parsedDate = format.parse(date);
	    Date dateInput = new Date(parsedDate.getTime());
    	List<Showtimes> showtime = this.showtimeService.getShowTimeByDate(dateInput, id);
        List<Showtimes> showtimes = new ArrayList<>();
        for(Showtimes s: showtime) {
        	if(s.getIsDelete() == false) {
        		showtimes.add(s);
        	}
        }
        return new DataResponse<>(true,"Thành công",showtimes);
    }

    @PostMapping("/saveShowtimes")
    public DataResponse<Showtimes> saveShowtimes(@RequestBody Showtimes listShowtimes){
    	System.out.println(listShowtimes.getTimeStart());
    	System.out.println(listShowtimes.getTimeEnd());
    	listShowtimes.setIsDelete(false);
//    	System.out.println(listShowtimes.getDate());
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.save(listShowtimes));
    }
    
    @PutMapping("/updateData")
    public DataResponse<Showtimes> updateData(@RequestBody Showtimes listShowtimes){
    	if(listShowtimes.getId() == null) {
    		listShowtimes.setIsDelete(false);
    		return new DataResponse<>(true,"Thành công",this.showtimesRepository.save(listShowtimes));
    	}
        Showtimes newShowtime = this.showtimesRepository.findById(listShowtimes.getId()).orElse(null);
        newShowtime.setIsDelete(listShowtimes.getIsDelete());
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.save(newShowtime));
    }
    
    @GetMapping("/getShowtimesByDate")
    public DataResponse<List<Showtimes>> getShowtimeByDate(@RequestParam String date) throws ParseException{
    	 SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
    	    java.util.Date parsedDate = format.parse(date);
    	    Date dateInput = new Date(parsedDate.getTime());
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getShowTimesByDate(dateInput));
    }
    
    @GetMapping("/getShowtimesByID")
    public DataResponse<List<Showtimes>> getShowtimeByID(@RequestParam int id) throws ParseException{
    	Long longValue = Long.valueOf(id);
    	Long id1 = longValue.longValue();
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getShowTimesByID(id1));
    }
    
    @GetMapping("/getShowtimeByDateAndID")
    public DataResponse<List<Showtimes>> getShowtimeByDateAndID(@RequestParam String date, @RequestParam int id) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
        java.util.Date parsedDate = format.parse(date);
        Date dateInput = new Date(parsedDate.getTime());
        return new DataResponse<>(true, "Thành công", this.showtimesRepository.getShowTimeByDate(dateInput, id));
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
        Date date = (java.sql.Date) new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        return new DataResponse<>(true,"Thành công", this.showtimeService.getShowtimeByMovieAndDate(idMovie,date));
    }

    @GetMapping("/id/{showtimeId}")
    public DataResponse<Showtimes> findById(@PathVariable("showtimeId") Long showtimeId){
        return new DataResponse<>(true,"Thành công", this.showtimesRepository.findById(showtimeId).get());

    }
}
