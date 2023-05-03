package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "showtimes")
public class Showtimes {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movies movie;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Rooms room;

    @Column(name = "date")
    private Date date;

    @Column(name = "time_start")
    private Date timeStart;

    @Column(name = "time_end")
    private Date timeEnd;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "status")
    private Integer status;

    @Column(name = "is_delete")
    private Boolean isDelete;

    @JsonIgnore
    @OneToMany(mappedBy = "showtime")
    private List<Tickets> listTickets;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Movies getMovie() {
		return movie;
	}

	public void setMovie(Movies movie) {
		this.movie = movie;
	}

	public Rooms getRoom() {
		return room;
	}

	public void setRoom(Rooms room) {
		this.room = room;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(String date) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	    java.util.Date parsedDate = format.parse(date);
	    Date dateInput = new Date(parsedDate.getTime());
		this.date = dateInput;
	}

	public Date getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(String timeStart) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	    java.util.Date parsedDate = format.parse(timeStart);
	    Date dateInput = new Date(parsedDate.getTime());
		this.timeStart = dateInput;
	}

	public Date getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(String timeEnd) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	    java.util.Date parsedDate = format.parse(timeEnd);
	    Date dateInput = new Date(parsedDate.getTime());
		this.timeEnd = dateInput;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
	    java.util.Date parsedDate = format.parse(createDate);
	    Date dateInput = new Date(parsedDate.getTime());
		this.createDate = dateInput;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) throws ParseException {

		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
	    java.util.Date parsedDate = format.parse(updateDate);
	    Date dateInput = new Date(parsedDate.getTime());
		this.updateDate = dateInput;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Boolean getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}

	public List<Tickets> getListTickets() {
		return listTickets;
	}

	public void setListTickets(List<Tickets> listTickets) {
		this.listTickets = listTickets;
	}

    
}
