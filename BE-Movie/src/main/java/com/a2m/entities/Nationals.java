package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "nationals")
public class Nationals {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name_vi")
    private String nameVi;

    @Column(name = "is_delete")
    private Boolean isDelete;

    @JsonIgnore
    @OneToMany(mappedBy = "national")
    private List<Movies> listNationals;

    public Nationals(Integer id, String nameVi, Boolean isDelete, List<Movies> listNationals) {
        this.id = id;
        this.nameVi = nameVi;
        this.isDelete = isDelete;
        this.listNationals = listNationals;
    }

    public Nationals() {
    }

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

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public List<Movies> getListNationals() {
        return listNationals;
    }

    public void setListNationals(List<Movies> listNationals) {
        this.listNationals = listNationals;
    }
}
