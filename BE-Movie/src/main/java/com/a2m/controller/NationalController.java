package com.a2m.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Nationals;
import com.a2m.service.NationService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/national")
public class NationalController {
	
	@Autowired
	NationService nationService;
	
	@GetMapping(value = "/listNational")
	List<Nationals> getList(){
		return nationService.getListNationals();
		
	}
}
