package com.a2m.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.entities.Tickets;


@Service
public interface TickeService {
	List<Tickets> getListTickets();
	
}
