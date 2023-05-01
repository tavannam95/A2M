package com.a2m.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.a2m.model.request.BillRequest;
import com.a2m.model.response.DataResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;

import com.a2m.dto.BillDTO;
import com.a2m.entities.Accounts;
import com.a2m.entities.Bills;
import com.a2m.repository.BillRepository;
import com.a2m.service.BillService;
import com.a2m.service.mapper.BillDTOMapper;
import com.a2m.util.SecurityUtils;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/bill")
@Slf4j
public class BillController {
	
	@Autowired
	BillService billService;
	
	@Autowired
	BillRepository billRepository;
	
	@Autowired
	BillDTOMapper billDTOMapper;
	
	@GetMapping(value = "/listBill")
	List<BillDTO> getListBill(){
		return billService.getListBill();
	}
	
	@GetMapping(value = "/{id}")
	Bills getBill(@PathVariable("id") Long id) {
		return billRepository.findById(id).get();
	}

	@PostMapping("/create")
	DataResponse<Bills> create(@RequestBody BillRequest billRequest){
		return new DataResponse<>(true,"Đặt vé thành công",this.billService.createBill(billRequest));
	}
	
	@GetMapping(value ="/billUser")
	List<BillDTO> getBillUser() {
		Accounts accounts = SecurityUtils.getLoggedUser().get();
		List<Bills> bills = billRepository.findByCustomerId(accounts.getId());
		System.out.println("bill "+bills);
		System.out.println("ac"+accounts.getId());
		List<BillDTO> billDTOs = new ArrayList<>();
		for (Bills bill : bills) {
			BillDTO billDTO = billDTOMapper.apply(bill);
			billDTOs.add(billDTO);
		}
//		return billDTOMapper.apply(bills);
		return billDTOs;
	}
}
