package com.a2m.controller;

import com.a2m.entities.Rooms;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.RoomsRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/room")
@AllArgsConstructor
public class RoomController {

    private RoomsRepository roomsRepository;

    @GetMapping("")
    public DataResponse<List<Rooms>> findAll(){
        List<Rooms> roomsList = this.roomsRepository.findAll();
        return new DataResponse<>(true,"Thành công",roomsList);
    }

    @PostMapping("")
    public DataResponse<Rooms> create(@RequestBody Rooms rooms){
        return new DataResponse<>(true,"Thêm mới thành công",roomsRepository.save(rooms));
    }
}
