package com.a2m.service.impl;

import com.a2m.entities.Accounts;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.AccountsRepository;
import com.a2m.service.AccountService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

	private final AccountsRepository accountsRepository;

	@Override
	public Accounts saveOrUpdate(Accounts account) {
		log.info("âdfksdfksdj----" + account.getFullname());
		return null;
	}

	@Override
	public Accounts updateAccount(Accounts account) {
		Accounts account1 = accountsRepository.findById(account.getId()).orElse(null);
		if (account1 == null) {
			return null;
		} else {
			long millis=System.currentTimeMillis();  
			java.sql.Date date=new java.sql.Date(millis);  
			account1.setFullname(account.getFullname());
			account1.setUsername(account.getUsername());
			account1.setEmail(account.getEmail());
			account1.setBirthDate(account.getBirthDate());
			account1.setCreateBy(account.getCreateBy());
			account1.setCreateDate(account.getCreateDate());
			account1.setUpdateBy(account.getUpdateBy());
			account1.setUpdateDate(date);
			account1.setGender(account.getGender());
			return accountsRepository.save(account1);
		}
	}

	public List<String> getEmail() {
		List<String> Emails = new ArrayList<>();
		List<Accounts> accountsList = this.accountsRepository.findAll();
		for (Accounts a : accountsList) {
			Emails.add(a.getEmail());
		}
		return Emails;
	}
}
