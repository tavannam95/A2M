package com.a2m.service.impl;

import com.a2m.dto.AccountDTO;
import com.a2m.entities.Accounts;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.AccountsRepository;
import com.a2m.service.AccountService;
import com.a2m.service.mapper.AccountDTOMapper;
import com.a2m.util.SecurityUtils;
import com.cloudinary.provisioning.Account;
import com.sun.xml.bind.v2.runtime.output.Encoded;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{
	
    private final AccountsRepository accountsRepository;
    
    private final AccountDTOMapper accountDTOMapper;
    
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
    	for(Accounts a: accountsList) {
    		Emails.add(a.getEmail());
    	}
    	return Emails;
    }

	@Override
	public Accounts updateUser(Accounts accounts) {
		Accounts account1 = SecurityUtils.getLoggedUser().get();		

		if (account1 == null) {
            return null;
        }
		if(accounts.getFullname()!=null) {
			account1.setFullname(accounts.getFullname());
		}
		if(accounts.getUsername()!=null) {
			account1.setUsername(accounts.getUsername());
		}
		if(accounts.getEmail()!=null) {
			account1.setEmail(accounts.getEmail());
		}
		if(accounts.getBirthDate()!=null) {
			account1.setBirthDate(accounts.getBirthDate());
		}
		if(accounts.getGender()!=null) {
			account1.setGender(accounts.getGender());
		}
		if(accounts.getPhone()!=null) {
			account1.setPhone(accounts.getPhone());
		}
		if(accounts.getPhoto()!=null) {
			account1.setPhoto(accounts.getPhoto());
		}
		
		return accountsRepository.save(account1);
	}

	@Override
	public Accounts updatePassword(Accounts accounts) {
		Accounts account1 = SecurityUtils.getLoggedUser().get();
		if (account1 == null) {
            return null;
        }
		if(accounts.getPassword()!=null) {
			System.out.println("pw: "+accounts.getPassword());
			String encodePassword = new BCryptPasswordEncoder().encode(accounts.getPassword());
			account1.setPassword(encodePassword);
		}
		return accountsRepository.save(account1);
	}

	@Override
	public Boolean checkPassword(String oldPassword) {
		Accounts account = SecurityUtils.getLoggedUser().get();
//		String encodePassword = new BCryptPasswordEncoder().encode(oldPassword);
		Boolean check = new BCryptPasswordEncoder().matches(oldPassword , account.getPassword());
//		System.out.println("check: "+check);
		return check;
	}

		List<String> Emails = new ArrayList<>();
		List<Accounts> accountsList = this.accountsRepository.findAll();
		for (Accounts a : accountsList) {
			Emails.add(a.getEmail());
		}
		return Emails;
	}
}
