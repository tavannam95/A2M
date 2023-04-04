package com.a2m.entities;

import javax.persistence.*;

@Entity
@Table(name = "menus")
public class Menus {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "name")
    private String name;

    @Column(name = "link")
    private String link;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Menus() {
    }

    public Menus(Integer id, Integer roleId, String name, String link) {
        this.id = id;
        this.roleId = roleId;
        this.name = name;
        this.link = link;
    }
}
