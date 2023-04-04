package com.a2m.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "movie_times")
public class MovieTimes {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "time_start")
    private Date timeStart;

    @Column(name = "time_end")
    private Date timeEnd;

    @Column(name = "movie_day_id")
    private Long movieDayId;

    @Column(name = "status")
    private Byte status;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTimeStart() {
        return this.timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Date getTimeEnd() {
        return this.timeEnd;
    }

    public void setTimeEnd(Date timeEnd) {
        this.timeEnd = timeEnd;
    }

    public Long getMovieDayId() {
        return this.movieDayId;
    }

    public void setMovieDayId(Long movieDayId) {
        this.movieDayId = movieDayId;
    }

    public Byte getStatus() {
        return this.status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
