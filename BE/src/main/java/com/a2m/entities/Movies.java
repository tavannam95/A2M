package com.a2m.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "movies")
public class Movies {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "national_id")
    private Byte nationalId;

    @Column(name = "category_id")
    private Byte categoryId;

    @Column(name = "name")
    private String name;

    @Column(name = "time")
    private Byte time;

    @Column(name = "poster")
    private String poster;

    @Column(name = "summary")
    private String summary;

    @Column(name = "premiere_date")
    private Date premiereDate;

    @Column(name = "status")
    private Byte status;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "is_delete")
    private Boolean isDelete;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Byte getNationalId() {
        return this.nationalId;
    }

    public void setNationalId(Byte nationalId) {
        this.nationalId = nationalId;
    }

    public Byte getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(Byte categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte getTime() {
        return this.time;
    }

    public void setTime(Byte time) {
        this.time = time;
    }

    public String getPoster() {
        return this.poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getSummary() {
        return this.summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Date getPremiereDate() {
        return this.premiereDate;
    }

    public void setPremiereDate(Date premiereDate) {
        this.premiereDate = premiereDate;
    }

    public Byte getStatus() {
        return this.status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Date getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return this.updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public Boolean getIsDelete() {
        return this.isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }
}
