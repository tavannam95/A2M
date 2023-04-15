package com.a2m.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.entities.Bills;

@Service
public interface BillService {
	List<Bills> getListBill();
}
