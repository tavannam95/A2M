package com.a2m.model.request;

import com.a2m.entities.Seats;
import com.a2m.model.dto.RoomDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {
    private Integer roomId;
    private List<RoomDTO> data;
}
