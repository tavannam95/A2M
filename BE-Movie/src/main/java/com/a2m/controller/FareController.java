package com.a2m.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Accounts;
import com.a2m.entities.Fares;
import com.a2m.service.FareService;
import com.a2m.util.SecurityUtils;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/fare")
public class FareController {
	
	@Autowired
	FareService fareService;
	
	@GetMapping(value = "/listFare")
	List<Fares> getListFare(){
//		Optional<Accounts> loggedUserOptional = SecurityUtils.getLoggedUser();
//		System.err.println("logged User: " + loggedUserOptional.get().getEmail());
		return fareService.getListFares();
		
	}
}
