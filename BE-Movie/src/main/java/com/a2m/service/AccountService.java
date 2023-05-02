package com.a2m.service;

import com.a2m.dto.AccountDTO;
import com.a2m.entities.Accounts;

public interface AccountService {
//    List<Accounts> findByUsername(String username);
	Accounts saveOrUpdate(Accounts account);
	
	Accounts updateAccount(Accounts account);

	Accounts updateUser(Accounts accouns);
	
	Accounts updatePassword(Accounts accounts);
	
	Boolean checkPassword(String oldPassword);
}
