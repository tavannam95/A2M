package com.a2m.model.response;

import com.a2m.entities.Seats;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RowResponse {
    private Integer id;
    private String name;
    private Boolean isDelete;
    List<Seats> listSeats;
}
