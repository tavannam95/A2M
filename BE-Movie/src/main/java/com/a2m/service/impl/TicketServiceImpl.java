package com.a2m.service.impl;

import java.util.List;

import com.a2m.entities.Showtimes;
import com.a2m.repository.ShowtimesRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Tickets;
import com.a2m.repository.TicketsRepository;
import com.a2m.service.TickeService;

@Service
@AllArgsConstructor
public class TicketServiceImpl implements TickeService{
	
	@Autowired
	TicketsRepository ticketsRepository;

	ShowtimesRepository showtimesRepository;
	
	@Override
	public List<Tickets> getListTickets() {
		
		return ticketsRepository.findAll();
	}

	@Override
	public List<Tickets> findByShowtime(Long showtimeId) {
		Showtimes showtimes = this.showtimesRepository.findById(showtimeId).get();
		return this.ticketsRepository.findByShowtime(showtimes);
	}

}
