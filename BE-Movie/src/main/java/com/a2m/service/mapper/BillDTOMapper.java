package com.a2m.service.mapper;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.dto.BillDTO;
import com.a2m.entities.Bills;

@Service
public class BillDTOMapper implements Function<Bills, BillDTO>{
	
	@Autowired
	AccountDTOMapper accountDTOMapper;
	
	@Override
	public BillDTO apply(Bills t) {
		
		return new BillDTO(
				t.getId(),
				t.getBillCode(),
				t.getBarCode(),
				t.getTotalPrice(),
				t.getCreatedDate(),
				accountDTOMapper.apply(t.getCustomer()),
				t.getListTickets()
				);
	}
	
}
