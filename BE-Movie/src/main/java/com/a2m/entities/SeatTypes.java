package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "seat_types")
public class SeatTypes {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name_vi")
    private String nameVi;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "is_delete")
    private Boolean isDelete;

    @JsonIgnore
    @OneToMany(mappedBy = "seatType")
    private List<Seats> listSeats;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameVi() {
        return nameVi;
    }

    public void setNameVi(String nameVi) {
        this.nameVi = nameVi;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public List<Seats> getListSeats() {
        return listSeats;
    }

    public void setListSeats(List<Seats> listSeats) {
        this.listSeats = listSeats;
    }

    public SeatTypes(Integer id, String nameVi, String nameEn, Boolean isDelete, List<Seats> listSeats) {
        this.id = id;
        this.nameVi = nameVi;
        this.nameEn = nameEn;
        this.isDelete = isDelete;
        this.listSeats = listSeats;
    }

    public SeatTypes() {
    }
}
