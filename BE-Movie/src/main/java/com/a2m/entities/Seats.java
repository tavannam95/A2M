package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "seats")
public class Seats {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "number")
    private Integer number;

    @ManyToOne
    @JoinColumn(name = "seat_type_id", referencedColumnName = "id")
    private SeatTypes seatType;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Rooms room;

    @Column(name = "row_quantity")
    private Integer rowQuantity;

    @Column(name = "status")
    private Integer status;

    @JsonIgnore
    @OneToMany(mappedBy = "seat")
    private List<Tickets> listTickets;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public SeatTypes getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatTypes seatType) {
        this.seatType = seatType;
    }

    public Rooms getRoom() {
        return room;
    }

    public void setRoom(Rooms room) {
        this.room = room;
    }

    public Integer getRowQuantity() {
        return rowQuantity;
    }

    public void setRowQuantity(Integer rowQuantity) {
        this.rowQuantity = rowQuantity;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Tickets> getListTickets() {
        return listTickets;
    }

    public void setListTickets(List<Tickets> listTickets) {
        this.listTickets = listTickets;
    }

    public Seats(Integer id, Integer number, SeatTypes seatType, Rooms room, Integer rowQuantity, Integer status, List<Tickets> listTickets) {
        this.id = id;
        this.number = number;
        this.seatType = seatType;
        this.room = room;
        this.rowQuantity = rowQuantity;
        this.status = status;
        this.listTickets = listTickets;
    }

    public Seats() {
    }
}
