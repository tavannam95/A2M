package com.a2m.controller;

import java.util.List;

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
public class TicketController {
	
	@Autowired
	TickeService tickeService;
	
	@Autowired
	TicketsRepository ticketsRepository;
	
	@GetMapping(value = "/listTicket")
	List<Tickets> getListTickets(){
		return tickeService.getListTickets();
	}
	
	@GetMapping(value = "/{id}")
	Tickets getBill(@PathVariable("id") Long id) {
		return ticketsRepository.findById(id).get();
		
	}
}
