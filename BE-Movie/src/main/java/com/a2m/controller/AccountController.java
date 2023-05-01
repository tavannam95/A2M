package com.a2m.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;

	@GetMapping("/getAll")
	public DataResponse<List<Accounts>> findAll() {
		List<AccountInfor> accountinforList = new ArrayList<>();
		List<Accounts> accountsList = this.accountRepository.findAll();
//		for (Accounts a : accountsList) {
//			if(a.getIsDelete() == null) {
//				continue;
//			}
//			else if (a.getIsDelete() == false) {
//				AccountInfor account = new AccountInfor();
//				account.setId(a.getId());
//				account.setFullname(a.getFullname());
//				account.setUsername(a.getUsername());
//				account.setPassword(a.getPassword());
//				account.setEmail(a.getEmail());
//				account.setBirthDate(a.getBirthDate());
//				account.setGender(a.getGender());
//				account.setRoles(a.getRole().getName());
//				accountinforList.add(account);
//			}
//		}
//		return new DataResponse<>(true, "Thành công", accountsList);
		return new DataResponse<>(true, "Thành công", this.accountRepository.findAll());
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
		return new DataResponse<>(true, "Thêm mới thành công", accountRepository.save(accounts));
	}

	@PutMapping("/updateAccount")
	public DataResponse<Accounts> updateaccount(@RequestBody Accounts accounts) {
		return new DataResponse<>(true, "Sửa thông tin thành công", accountService.updateAccount(accounts));
	}
	
	@GetMapping(value = "/userLogin")
	public AccountDTO getUser() {
		Accounts accounts = SecurityUtils.getLoggedUser().get();
		System.out.println("email"+accounts.getEmail());
		System.out.println("ac: "+accounts);
		System.out.println("data: "+accountDTOMapper.apply(accounts));
		return accountDTOMapper.apply(accounts);
	}
	
	@PutMapping("/updateUser")
	public Accounts updateUser(@RequestBody Accounts accounts) {
		System.out.println("abc");
		return accountService.updateUser(accounts);
	}
}
