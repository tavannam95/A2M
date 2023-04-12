package com.a2m.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Nationals;
import com.a2m.repository.NationalsRepository;
import com.a2m.service.NationService;

@Service
public class NationServiceImpl implements NationService{
	
	@Autowired
	NationalsRepository nationalsRepository;
	@Override
	public List<Nationals> getListNationals() {
		
		return nationalsRepository.findAll();
	}
	
}
