package com.a2m.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seats {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "number")
    private Byte number;

    @Column(name = "seat_type_id")
    private Integer seatTypeId;

    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "row_quantity")
    private Byte rowQuantity;

    @Column(name = "status")
    private Byte status;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Byte getNumber() {
        return this.number;
    }

    public void setNumber(Byte number) {
        this.number = number;
    }

    public Integer getSeatTypeId() {
        return this.seatTypeId;
    }

    public void setSeatTypeId(Integer seatTypeId) {
        this.seatTypeId = seatTypeId;
    }

    public Integer getRoomId() {
        return this.roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public Byte getRowQuantity() {
        return this.rowQuantity;
    }

    public void setRowQuantity(Byte rowQuantity) {
        this.rowQuantity = rowQuantity;
    }

    public Byte getStatus() {
        return this.status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
