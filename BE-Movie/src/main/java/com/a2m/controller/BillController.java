package com.a2m.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Bills;
import com.a2m.repository.BillRepository;
import com.a2m.service.BillService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/bill")
public class BillController {
	
	@Autowired
	BillService billService;
	
	@Autowired
	BillRepository billRepository;
	
	@GetMapping(value = "/listBill")
	List<Bills> getListBill(){
		return billService.getListBill();
	}
	
	@GetMapping(value = "/{id}")
	Bills getBill(@PathVariable("id") Long id) {
		return billRepository.findById(id).get();
		
	}
}
