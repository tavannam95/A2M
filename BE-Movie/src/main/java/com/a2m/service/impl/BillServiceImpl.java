package com.a2m.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Random;

import com.a2m.entities.*;
import com.a2m.model.request.BillRequest;
import com.a2m.repository.AccountsRepository;
import com.a2m.repository.TicketsRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.repository.BillRepository;
import com.a2m.service.BillService;

@Service
@AllArgsConstructor
public class BillServiceImpl implements BillService{
	
	@Autowired
	BillRepository billRepository;

	TicketsRepository ticketsRepository;

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
		bills.setStatus(0);
		bills.setCustomer(accounts);
		bills.setCreatedDate(new Date());

		while(true){
			Random generator = new Random();
			int barCode = generator.nextInt((9999999 - 1000000) + 1) + 1000000;
			Bills bills1 = this.billRepository.findByBarCode(barCode+"");
			if (bills1 == null){
				bills.setBarCode(barCode+"");
				break;
			}
		}
		while(true){
			Random generator = new Random();
			int barCode = generator.nextInt((9999999 - 1000000) + 1) + 1000000;
			Bills bills1 = this.billRepository.findByBillCode("Amenic_"+barCode);
			if (bills1 == null){
				bills.setBillCode("Amenic_"+barCode);
				break;
			}
		}
		Bills billResponse = this.billRepository.save(bills);
		Showtimes showtimes = new Showtimes();
		showtimes.setId(billRequest.getShowtimeId());
		for (int i = 0; i < billRequest.getListSeatFare().size(); i++) {
			Seats seats = new Seats();
			seats.setId(billRequest.getListSeatFare().get(i).getSeatId());
			Fares fares = new Fares();
			fares.setId(billRequest.getListSeatFare().get(i).getFareId());
			Tickets tickets = new Tickets();
			while(true){
				Random generator = new Random();
				int barCode = generator.nextInt((9999999 - 1000000) + 1) + 1000000;
				Tickets tickets1 = this.ticketsRepository.findByTicketId("TI"+barCode);
				if (tickets1 == null){
					tickets.setTicketId("TI"+barCode);
					break;
				}
			}
			tickets.setShowtime(showtimes);
			tickets.setBill(billResponse);
			tickets.setSeat(seats);
			tickets.setFare(fares);
			tickets.setCreateDate(new Date());
			tickets.setStatus(0);
			this.ticketsRepository.save(tickets);
		}
		return billResponse;
	}

}
