package com.a2m.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {
    private String name;
    private int quantityRow;
    private int quantitySeat;
    private int way;
}
