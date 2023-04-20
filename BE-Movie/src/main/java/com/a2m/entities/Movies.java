package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "movies")
public class Movies {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "national_id", referencedColumnName = "id")
    private Nationals national;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Categories category;

    @Column(name = "name")
    private String name;

    @Column(name = "time")
    private Integer time;

    @Column(name = "poster")
    private String poster;

    @Column(name = "summary")
    private String summary;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
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

    @JsonIgnore
    @OneToMany(mappedBy = "movie")
    private List<Showtimes> listShowtimes;

    public void setId(Long id) {
        this.id = id;
    }

    public void setNational(Nationals national) {
        this.national = national;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public void setListShowtimes(List<Showtimes> listShowtimes) {
        this.listShowtimes = listShowtimes;
    }

    public Long getId() {
        return id;
    }

    public Nationals getNational() {
        return national;
    }

    public Categories getCategory() {
        return category;
    }

    public String getName() {
        return name;
    }

    public Integer getTime() {
        return time;
    }

    public String getPoster() {
        return poster;
    }

    public String getSummary() {
        return summary;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public String getCreateBy() {
        return createBy;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public Boolean getDelete() {
        return isDelete;
    }

    public List<Showtimes> getListShowtimes() {
        return listShowtimes;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Movies(){

    }
    public Movies(Long id, Nationals national, Categories category, String name, Integer time, String poster, String summary, Date startDate, Date endDate, Date createDate, Date updateDate, String createBy, String updateBy, Boolean isDelete, List<Showtimes> listShowtimes) {
        this.id = id;
        this.national = national;
        this.category = category;
        this.name = name;
        this.time = time;
        this.poster = poster;
        this.summary = summary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.createBy = createBy;
        this.updateBy = updateBy;
        this.isDelete = isDelete;
        this.listShowtimes = listShowtimes;
    }
}
