package com.a2m.controller;

import java.util.List;

import com.a2m.model.request.BillRequest;
import com.a2m.model.response.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

	@PostMapping("/create")
	DataResponse<Bills> create(@RequestBody BillRequest billRequest){
		return new DataResponse<>(true,"Tạo đơn thành công", this.billService.createBill(billRequest));
	}
}
