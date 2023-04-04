package com.a2m.entities;

import javax.persistence.*;

@Entity
@Table(name = "holidays")
public class Holidays {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "day_holiday")
    private Integer dayHoliday;

    @Column(name = "month_holiday")
    private Integer monthHoliday;

    @Column(name = "name")
    private String name;

    public Holidays(Integer id, Integer dayHoliday, Integer monthHoliday, String name) {
        this.id = id;
        this.dayHoliday = dayHoliday;
        this.monthHoliday = monthHoliday;
        this.name = name;
    }

    public Holidays() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDayHoliday() {
        return dayHoliday;
    }

    public void setDayHoliday(Integer dayHoliday) {
        this.dayHoliday = dayHoliday;
    }

    public Integer getMonthHoliday() {
        return monthHoliday;
    }

    public void setMonthHoliday(Integer monthHoliday) {
        this.monthHoliday = monthHoliday;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
