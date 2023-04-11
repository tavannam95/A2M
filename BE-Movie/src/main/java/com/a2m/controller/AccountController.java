package com.a2m.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.AccountInfor;
import com.a2m.entities.Accounts;
import com.a2m.entities.Roles;
import com.a2m.entities.Rooms;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.AccountsRepository;
import com.a2m.repository.RoomsRepository;
import com.a2m.service.AccountService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/account")
@AllArgsConstructor
public class AccountController {
	
	 private AccountsRepository accountRepository;
	 
	 private AccountService accountService;
	 
	 @Autowired
	 private BCryptPasswordEncoder passwordencoder;

	    @GetMapping("/getAll")
	    public DataResponse<List<AccountInfor>> findAll(){
	    	List<AccountInfor> accountinforList = new ArrayList<>();
	        List<Accounts> accountsList = this.accountRepository.findAll();
	        for(Accounts a: accountsList) {
	        	AccountInfor account = new AccountInfor();
	        	account.setId(a.getId());
	        	account.setFullname(a.getFullname());
	        	account.setUsername(a.getUsername());
	        	account.setPassword(a.getPassword());
	        	account.setEmail(a.getEmail());
	        	account.setBirthDate(a.getBirthDate());
	        	account.setGender(a.getGender());
	        	account.setRoles(a.getRole().getName());
	        	accountinforList.add(account);
	        }
	        return new DataResponse<>(true,"Thành công",accountinforList);
	    }

	    @PostMapping("/createAccount")
	    public DataResponse<Accounts> createAccounts(@RequestBody Accounts accounts){
//	    	Accounts account = new Accounts();
//	    	Roles role = new Roles(accounts.getRole_id(), accounts.getRoles());
//	    	account.getRole().setId(accounts.getRole_id());
//	    	account.getRole().setName(accounts.getRoles());;
	    	accounts.setPassword(passwordencoder.encode(accounts.getPassword()));
	        return new DataResponse<>(true,"Thêm mới thành công",accountRepository.save(accounts));
	    }
	    
	    @GetMapping("/getEmail")
	    public DataResponse<List<String>> getEmail() {
	    	List<String> Emails = new ArrayList<>();
	    	List<Accounts> accountsList = this.accountRepository.findAll();
	    	for(Accounts a: accountsList) {
	    		Emails.add(a.getEmail());
	    	}
	    	return new DataResponse<>(true,"Thành công",Emails); 
	    }
	    
}
