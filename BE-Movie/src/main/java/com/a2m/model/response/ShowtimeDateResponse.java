package com.a2m.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ShowtimeDateResponse {
    @Id
    private Long idShowtime;
    private Date date;

    public ShowtimeDateResponse(Date date) {
        this.date = date;
    }
}
