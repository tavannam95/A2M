package com.a2m.service;

import java.util.List;

import com.a2m.model.request.BillRequest;
import org.springframework.stereotype.Service;

import com.a2m.dto.BillDTO;
import com.a2m.entities.Bills;

@Service
public interface BillService {
	List<BillDTO> getListBill();

	Bills createBill(BillRequest billRequest);
}
