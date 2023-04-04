package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "fares")
public class Fares {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "seat_type")
    private Integer seatType;

    @Column(name = "is_holiday")
    private Boolean isHoliday;

    @Column(name = "price")
    private Integer price;

    @JsonIgnore
    @OneToMany(mappedBy = "fare")
    private List<Tickets> listTickets;

}
