package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Rooms {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity_seat")
    private Integer quantitySeat;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private List<Seats> listSeats;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantitySeat() {
        return quantitySeat;
    }

    public void setQuantitySeat(Integer quantitySeat) {
        this.quantitySeat = quantitySeat;
    }

    public List<Seats> getListSeats() {
        return listSeats;
    }

    public void setListSeats(List<Seats> listSeats) {
        this.listSeats = listSeats;
    }

    public Rooms(Integer id, String name, Integer quantitySeat, List<Seats> listSeats) {
        this.id = id;
        this.name = name;
        this.quantitySeat = quantitySeat;
        this.listSeats = listSeats;
    }

    public Rooms() {
    }
}
