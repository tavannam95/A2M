package com.a2m.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Tickets;
import com.a2m.repository.TicketsRepository;
import com.a2m.service.TickeService;

@Service
public class TicketServiceImpl implements TickeService{
	
	@Autowired
	TicketsRepository ticketsRepository;
	
	@Override
	public List<Tickets> getListTickets() {
		
		return ticketsRepository.findAll();
	}

}
