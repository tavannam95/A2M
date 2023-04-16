package com.a2m.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.entities.Fares;

@Service
public interface FareService {
	
	List<Fares> getListFares();
}
