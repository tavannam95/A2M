package com.a2m.service;

import java.util.List;

import com.a2m.entities.Showtimes;
import org.springframework.stereotype.Service;

import com.a2m.entities.Tickets;


@Service
public interface TickeService {
	List<Tickets> getListTickets();

	List<Tickets> findByShowtime(Long showtimeId);
	
}
