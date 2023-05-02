package com.a2m.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.dto.AccountDTO;
import com.a2m.entities.AccountInfor;
import com.a2m.entities.Accounts;
import com.a2m.entities.Roles;
import com.a2m.entities.Rooms;
import com.a2m.model.response.DataResponse;
import com.a2m.repository.AccountsRepository;
import com.a2m.repository.RoomsRepository;
import com.a2m.service.AccountService;
import com.a2m.service.impl.AccountServiceImpl;
import com.a2m.service.mapper.AccountDTOMapper;
import com.a2m.util.SecurityUtils;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/account")
@AllArgsConstructor
public class AccountController {

	private AccountsRepository accountRepository;

	private AccountService accountService;
	
	private AccountDTOMapper accountDTOMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;


	
	@GetMapping("/getAll")
	public DataResponse<List<Accounts>> findAll() {
		List<Accounts> accountinforList = new ArrayList<>();
		List<Accounts> accountsList = this.accountRepository.findAll();
		for (Accounts a : accountsList) {
			if(a.getIsDelete() == null || a.getIsDelete() == true) {
				continue;
			}
			else if(a.getBirthDate() == null) {
				continue;
			}
			else if(a.getRole() == null) {
				continue;
			}
			else {
				accountinforList.add(a);
				System.out.println(a.getId());
			}
		}
		return new DataResponse<>(true, "Thành công", accountinforList);
//		return new DataResponse<>(true, "Thành công", this.accountRepository.findAll());
	}

	@PostMapping("/createAccount")
	public DataResponse<Accounts> createAccounts(@RequestBody Accounts accounts) {
		List<Accounts> account = accountRepository.findAll();
		for (Accounts a : account) {
			if (a.getEmail().contentEquals(accounts.getEmail())) {
				return new DataResponse<>(false, "Email đã tồn tại", accounts);
			}
			if (a.getUsername().contentEquals(accounts.getUsername())) {
				return new DataResponse<>(false, "Username đã tồn tại", accounts);
			}
		}
		accounts.setIsDelete(false);
		accounts.setPassword(passwordEncoder.encode(accounts.getPassword()));
		return new DataResponse<>(true, "Thêm mới thành công", accountRepository.save(accounts));
	}

	@PutMapping("/updateAccount")
	public DataResponse<Accounts> updateaccount(@RequestBody Accounts accounts) {
		System.out.println(accounts.getBirthDate());
		return new DataResponse<>(true, "Sửa thông tin thành công", accountService.updateAccount(accounts));
	}
	
	@GetMapping(value = "/userLogin")
	public AccountDTO getUser() {
		Accounts accounts = SecurityUtils.getLoggedUser().get();
		return accountDTOMapper.apply(accounts);
	}
	
	@PutMapping("/updateUser")
	public Accounts updateUser(@RequestBody Accounts accounts) {
		return accountService.updateUser(accounts);
	}
	
	@GetMapping(value = "/userPassword")
	public Accounts getPassword() {
		Accounts accounts = SecurityUtils.getLoggedUser().get();
		return accounts;
	}
	
	@PutMapping("/updatePassword")
	public Accounts updatePassword(@RequestBody Accounts accounts) {
		return accountService.updatePassword(accounts);
	}
	
	@PostMapping("/checkPassword")
	public Boolean checkPassword(@RequestBody String oldPassword) {
		return accountService.checkPassword(oldPassword);
	}
}
