package com.a2m.controller;

import java.util.List;

import com.a2m.entities.Fares;
import com.a2m.entities.Showtimes;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.FareRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Tickets;
import com.a2m.repository.TicketsRepository;
import com.a2m.service.TickeService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/ticket")
@AllArgsConstructor
public class TicketController {
	
	@Autowired
	TickeService tickeService;
	
	@Autowired
	TicketsRepository ticketsRepository;

	FareRepository fareRepository;
	
	@GetMapping(value = "/listTicket")
	List<Tickets> getListTickets(){
		return tickeService.getListTickets();
	}
	
	@GetMapping(value = "/{id}")
	Tickets getBill(@PathVariable("id") Long id) {
		return ticketsRepository.findById(id).get();
		
	}

	@GetMapping("/showtime/{showtimeId}")
	public DataResponse<List<Tickets>> findByShowtime(@PathVariable("showtimeId") Long showtimeId){
		return new DataResponse<>(true,"Thành công",this.tickeService.findByShowtime(showtimeId));
	}

	@GetMapping("/fare/{isHoliday}")
	public DataResponse<List<Fares>> findByIsHoliday(@PathVariable("isHoliday") Boolean isHoliday){
		return new DataResponse<>(true,"Thành công", this.fareRepository.findByIsHoliday(isHoliday));
	}
}
