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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

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
        List<Showtimes> showtime = this.showtimesRepository.findAll();
        List<Showtimes> showtimes = new ArrayList<>();
        for(Showtimes s: showtime) {
        	if(s.getDelete() == false) {
        		showtimes.add(s);
        	}
        }
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
    	List<Showtimes> showtime = this.showtimesRepository.getShowTimeByDate(date, id);
        List<Showtimes> showtimes = new ArrayList<>();
        for(Showtimes s: showtime) {
        	if(s.getDelete() == false) {
        		showtimes.add(s);
        	}
        }
        return new DataResponse<>(true,"Thành công",showtimes);
    }

    @PostMapping("/saveShowtimes")
    public DataResponse<Showtimes> saveShowtimes(@RequestBody Showtimes listShowtimes){
    	System.out.println(listShowtimes.getTimeStart());
    	System.out.println(listShowtimes.getTimeEnd());
    	listShowtimes.setDelete(false);
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.save(listShowtimes));
    }
    
    @PutMapping("/updateData")
    public DataResponse<Showtimes> updateData(@RequestBody Showtimes listShowtimes){
    	if(listShowtimes.getId() == null) {
    		listShowtimes.setDelete(false);
    		return new DataResponse<>(true,"Thành công",this.showtimesRepository.save(listShowtimes));
    	}
        Showtimes newShowtime = this.showtimesRepository.findById(listShowtimes.getId()).orElse(null);
        newShowtime.setDelete(listShowtimes.getDelete());
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
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getShowTimesByID(id));
    }
    
    @GetMapping("/getShowtimeByDateAndID")
    public DataResponse<List<Showtimes>> getShowtimeByDateAndID(@RequestParam String date, @RequestParam int id) throws ParseException{
    	 SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
    	    java.util.Date parsedDate = format.parse(date);
    	    Date dateInput = new Date(parsedDate.getTime());
        return new DataResponse<>(true,"Thành công",this.showtimesRepository.getShowTimeByDate(dateInput, id));
    }
}
