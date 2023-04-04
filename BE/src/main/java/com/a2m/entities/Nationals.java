package com.a2m.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "nationals")
public class Nationals {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name_vi")
    private String nameVi;

    @Column(name = "is_delete")
    private Boolean isDelete;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameVi() {
        return this.nameVi;
    }

    public void setNameVi(String nameVi) {
        this.nameVi = nameVi;
    }

    public Boolean getIsDelete() {
        return this.isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }
}
