package com.a2m.entities;

import javax.persistence.*;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSeatType() {
        return seatType;
    }

    public void setSeatType(Integer seatType) {
        this.seatType = seatType;
    }

    public Boolean getHoliday() {
        return isHoliday;
    }

    public void setHoliday(Boolean holiday) {
        isHoliday = holiday;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Fares(Integer id, Integer seatType, Boolean isHoliday, Integer price) {
        this.id = id;
        this.seatType = seatType;
        this.isHoliday = isHoliday;
        this.price = price;
    }

    public Fares() {
    }
}
