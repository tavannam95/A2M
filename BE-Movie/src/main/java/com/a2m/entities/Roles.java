package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
public class Roles {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<Accounts> listAccounts;

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

    public List<Accounts> getListAccounts() {
        return listAccounts;
    }

    public void setListAccounts(List<Accounts> listAccounts) {
        this.listAccounts = listAccounts;
    }

    public Roles(Integer id, String name, List<Accounts> listAccounts) {
        this.id = id;
        this.name = name;
        this.listAccounts = listAccounts;
    }

    public Roles() {
    }
}
