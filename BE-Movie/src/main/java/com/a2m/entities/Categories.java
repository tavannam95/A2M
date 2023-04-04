package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Categories {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_delete")
    private Boolean isDelete;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Movies> listMovies;

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

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public List<Movies> getListMovies() {
        return listMovies;
    }

    public void setListMovies(List<Movies> listMovies) {
        this.listMovies = listMovies;
    }

    public Categories() {
    }

    public Categories(Integer id, String name, Boolean isDelete, List<Movies> listMovies) {
        this.id = id;
        this.name = name;
        this.isDelete = isDelete;
        this.listMovies = listMovies;
    }
}
