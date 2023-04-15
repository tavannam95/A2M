package com.a2m.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Fares;
import com.a2m.service.FareService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/fare")
public class FareController {
	
	@Autowired
	FareService fareService;
	
	@GetMapping(value = "/listFare")
	List<Fares> getListFare(){
		return fareService.getListFares();
		
	}
}
