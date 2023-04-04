package com.a2m.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tickets")
public class Tickets {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "ticket_id")
    private String ticketId;

    @Column(name = "movie_time_id")
    private Long movieTimeId;

    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "seat_id")
    private Integer seatId;

    @Column(name = "price")
    private Integer price;

    @Column(name = "bar_code")
    private String barCode;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "status")
    private Byte status;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketId() {
        return this.ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public Long getMovieTimeId() {
        return this.movieTimeId;
    }

    public void setMovieTimeId(Long movieTimeId) {
        this.movieTimeId = movieTimeId;
    }

    public Long getMovieId() {
        return this.movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getCustomerId() {
        return this.customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Integer getSeatId() {
        return this.seatId;
    }

    public void setSeatId(Integer seatId) {
        this.seatId = seatId;
    }

    public Integer getPrice() {
        return this.price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getBarCode() {
        return this.barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public Date getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Byte getStatus() {
        return this.status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
