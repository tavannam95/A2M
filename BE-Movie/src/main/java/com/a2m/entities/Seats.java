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
@Table(name = "seats")
public class Seats {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "location")
    private Integer location;

    @ManyToOne
    @JoinColumn(name = "seat_type_id", referencedColumnName = "id")
    private SeatTypes seatType;

    @ManyToOne
    @JoinColumn(name = "row_id", referencedColumnName = "id")
    private SeatRows row;

    @Column(name = "status")
    private Integer status;

    @Column(name = "is_delete")
    private Boolean isDelete;


    @JsonIgnore
    @OneToMany(mappedBy = "seat")
    private List<Tickets> listTickets;

}
