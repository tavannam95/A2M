package com.a2m.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tickets")
public class Tickets {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "ticket_id")
    private String ticketId;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Accounts customer;

    @ManyToOne
    @JoinColumn(name = "showtime_id", referencedColumnName = "id")
    private Showtimes showtime;

    @ManyToOne
    @JoinColumn(name = "seat_id", referencedColumnName = "id")
    private Seats seat;

    @Column(name = "price")
    private Integer price;

    @Column(name = "bar_code")
    private String barCode;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "status")
    private Integer status;

    public Tickets() {
    }

    public Tickets(Long id, String ticketId, Accounts customer, Showtimes showtime, Seats seat, Integer price, String barCode, Date createDate, String createBy, Integer status) {
        this.id = id;
        this.ticketId = ticketId;
        this.customer = customer;
        this.showtime = showtime;
        this.seat = seat;
        this.price = price;
        this.barCode = barCode;
        this.createDate = createDate;
        this.createBy = createBy;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public Accounts getCustomer() {
        return customer;
    }

    public void setCustomer(Accounts customer) {
        this.customer = customer;
    }

    public Showtimes getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtimes showtime) {
        this.showtime = showtime;
    }

    public Seats getSeat() {
        return seat;
    }

    public void setSeat(Seats seat) {
        this.seat = seat;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
