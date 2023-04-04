package com.a2m.service.impl;

import com.a2m.repository.AccountsRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountServiceImpl {
    private final AccountsRepository accountsRepository;
}
