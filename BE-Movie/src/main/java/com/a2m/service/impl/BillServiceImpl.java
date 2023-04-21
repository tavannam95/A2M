package com.a2m.service.impl;

import java.util.List;
import java.util.Random;

import com.a2m.entities.Accounts;
import com.a2m.model.request.BillRequest;
import com.a2m.repository.AccountsRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Bills;
import com.a2m.repository.BillRepository;
import com.a2m.service.BillService;

@Service
@AllArgsConstructor
public class BillServiceImpl implements BillService{
	
	@Autowired
	BillRepository billRepository;

	AccountsRepository accountsRepository;
	
	@Override
	public List<Bills> getListBill() {
		// TODO Auto-generated method stub
		return billRepository.findAll();
	}

	@Override
	public Bills createBill(BillRequest billRequest) {
		Accounts accounts =this.accountsRepository.findById(billRequest.getIdAccount()).get();
		Bills bills = new Bills();
		bills.setTotalPrice(billRequest.getTotalPrice());
		bills.setStatus(1);
		bills.setCustomer(accounts);
		while(true){
			Random generator = new Random();
			int barCode = generator.nextInt((9999999 - 1000000) + 1) + 1000000;
			Bills bills1 = this.billRepository.findByBarCode(barCode+"");
			System.out.println(bills1);
			if (bills1 == null){
				bills.setBarCode(barCode+"");
				break;
			}
		}
		while(true){
			Random generator = new Random();
			int barCode = generator.nextInt((9999999 - 1000000) + 1) + 1000000;
			Bills bills1 = this.billRepository.findByBillCode("Amenic_"+barCode);
			System.out.println(bills1);
			if (bills1 == null){
				bills.setBillCode("Amenic_"+barCode);
				break;
			}
		}
		Bills billResponse = this.billRepository.save(bills);
		return billResponse;
	}

}
