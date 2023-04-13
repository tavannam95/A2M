package com.a2m.controller;

import com.a2m.entities.Showtimes;
import com.a2m.entities.ShowtimesInfor;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/showtime")
@AllArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    private final ShowtimesRepository showtimesRepository;

    @GetMapping("/today")
    public DataResponse<List<Showtimes>> today(){
        return new DataResponse<>(true,"Thành công",this.showtimeService.today());
    }

    @GetMapping("/getAllShowtimes")
    public DataResponse<List<ShowtimesInfor>> getAllShowtimes(){
        List<Showtimes> showtimes = this.showtimesRepository.findAll();
        List<ShowtimesInfor> showtimeinfor = new ArrayList<>();
        for(Showtimes s: showtimes){
            ShowtimesInfor infor = new ShowtimesInfor();
            infor.setNameMovie(s.getMovie().getName());
            infor.setRoom_id(s.getRooms().getId());
            infor.setId(s.getId());
            infor.setTimeStart(s.getTimeStart());
            infor.setTimeEnd(s.getTimeEnd());
            infor.setCreateDate(s.getCreateDate());
            infor.setDate(s.getDate());
            infor.setDelete(s.getDelete());
            showtimeinfor.add(infor);
        }
        return new DataResponse<>(true,"Thành công",showtimeinfor);
    }
}
