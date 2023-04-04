package com.a2m.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Rooms {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity_seat")
    private Integer quantitySeat;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantitySeat() {
        return this.quantitySeat;
    }

    public void setQuantitySeat(Integer quantitySeat) {
        this.quantitySeat = quantitySeat;
    }
}
