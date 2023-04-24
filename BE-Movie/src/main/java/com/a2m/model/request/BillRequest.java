package com.a2m.model.request;

import com.a2m.model.dto.SeatFareDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillRequest {
    private Long idAccount;
    private Integer totalPrice;
    private List<SeatFareDTO> listSeatFare;
    private Long showtimeId;
}
