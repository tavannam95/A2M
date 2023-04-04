package com.a2m.service.impl;

import com.a2m.repository.AccountsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl {
    private final AccountsRepository accountsRepository;
}
