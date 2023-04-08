package com.a2m.controller;

import com.a2m.entities.Rooms;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.RoomsRepository;
import com.a2m.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/room")
@AllArgsConstructor
public class RoomController {

    private RoomsRepository roomsRepository;

    private RoomService roomService;


    @GetMapping("")
    public DataResponse<List<Rooms>> findAll(){
        List<Rooms> roomsList = this.roomsRepository.findAll();
        return new DataResponse<>(true,"Thành công",roomsList);
    }

    @PostMapping("")
    public DataResponse<Rooms> create(@RequestBody Rooms rooms){
        return new DataResponse<>(true,"Thêm mới phòng thành công",roomService.createRoom(rooms));
    }

    @PutMapping("")
    public DataResponse<Rooms> update(@RequestBody Rooms rooms){
        return new DataResponse<>(true,"Cập nhật thông tin phòng thành công",roomService.updateRoom(rooms));
    }

    @PutMapping("active-or-inactive")
    public DataResponse<Rooms> activeOrInactive(@RequestBody Rooms rooms){
        return new DataResponse<>(true, "Thay đổi trạng thái thành công", this.roomService.activeOrInactive(rooms));
    }
}
