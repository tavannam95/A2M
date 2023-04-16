package com.a2m.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Fares;
import com.a2m.repository.FareRepository;
import com.a2m.service.FareService;

@Service
public class FareServiceImpl implements FareService{
	
	@Autowired
	FareRepository fareRepository;
	
	@Override
	public List<Fares> getListFares() {
		return fareRepository.findAll();
	}

}
