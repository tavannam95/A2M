package com.a2m.service.impl;

import com.a2m.entities.Accounts;
import com.a2m.repository.AccountsRepository;
import com.a2m.service.AccountService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{
    private final AccountsRepository accountsRepository;

	@Override
	public Accounts saveOrUpdate(Accounts account) {
		log.info("âdfksdfksdj----"+account.getFullname());
		return null;
	}
    
}
