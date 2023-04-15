package com.a2m.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Bills;
import com.a2m.repository.BillRepository;
import com.a2m.service.BillService;

@Service
public class BillServiceImpl implements BillService{
	
	@Autowired
	BillRepository billRepository;
	
	@Override
	public List<Bills> getListBill() {
		// TODO Auto-generated method stub
		return billRepository.findAll();
	}

}
