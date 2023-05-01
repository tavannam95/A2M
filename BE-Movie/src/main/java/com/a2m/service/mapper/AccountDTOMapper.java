package com.a2m.service.mapper;

import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.a2m.dto.AccountDTO;
import com.a2m.entities.Accounts;

@Service
public class AccountDTOMapper implements Function<Accounts, AccountDTO>{

	@Override
	public AccountDTO apply(Accounts t) {
		// TODO Auto-generated method stub
		return new AccountDTO(
				t.getId(),
				t.getFullname(),
				t.getUsername(),
				t.getEmail(),
				t.getBirthDate(),
				t.getGender(),
				t.getPhone(),
				t.getPhoto()
				);
	}
	
}
