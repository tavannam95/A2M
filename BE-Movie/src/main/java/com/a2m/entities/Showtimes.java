package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;

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
	private Rooms rooms;
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

	public Date getDate() {
		return date;
	}

	public void setDate(String date) throws ParseException {
		String[] dateFormats = { "MM/dd/yyyy"};
		for(String format: dateFormats) {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
            sdf.setLenient(false);
            this.date = sdf.parse(date);
		}
	}

	public Date getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(String timeStart) throws ParseException {
		String[] dateFormats = { "MM/dd/yyyy HH:mm:ss"};
		for(String format: dateFormats) {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
            sdf.setLenient(false);
            this.timeStart = sdf.parse(timeStart);
		}
	}

	public Date getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(String timeEnd) throws ParseException {
		String[] dateFormats = { "MM/dd/yyyy HH:mm:ss"};
		for(String format: dateFormats) {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
            sdf.setLenient(false);
            this.timeEnd = sdf.parse(timeEnd);
		}

	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) throws ParseException {
		String[] dateFormats = { "MM/dd/yyyy"};
		for(String format: dateFormats) {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
            sdf.setLenient(false);
            this.createDate = sdf.parse(createDate);
		}
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) throws ParseException {
		String[] dateFormats = { "MM/dd/yyyy", "M/dd/yyyy", "MM/d/yyyy", "M/d/yyyy" };
		for(String format: dateFormats) {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
            sdf.setLenient(false);
            this.updateDate = sdf.parse(updateDate);
		}
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

	public Boolean getDelete() {
		return isDelete;
	}

	public void setDelete(Boolean delete) {
		isDelete = delete;
	}

	public List<Tickets> getListTickets() {
		return listTickets;
	}

	public void setListTickets(List<Tickets> listTickets) {
		this.listTickets = listTickets;
	}

	public Rooms getRooms() {
		return rooms;
	}

	public void setRooms(Rooms rooms) {
		this.rooms = rooms;
	}

	public Showtimes(Long id, Movies movie, Rooms rooms, Date date, Date timeStart, Date timeEnd, Date createDate,
			Date updateDate, String createBy, String updateBy, Integer status, Boolean isDelete,
			List<Tickets> listTickets) {
		this.id = id;
		this.movie = movie;
		this.rooms = rooms;
		this.date = date;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.createBy = createBy;
		this.updateBy = updateBy;
		this.status = status;
		this.isDelete = isDelete;
		this.listTickets = listTickets;
	}

	public Showtimes() {
	}
}
