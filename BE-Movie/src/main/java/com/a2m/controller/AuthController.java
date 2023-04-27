package com.a2m.controller;

import com.a2m.entities.Accounts;
import com.a2m.entities.Menus;
import com.a2m.entities.Roles;
import com.a2m.model.response.DataResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.jwt.JwtUtil;
import com.a2m.model.request.JwtRequest;
import com.a2m.model.response.JwtResponse;
import com.a2m.repository.AccountsRepository;
import com.a2m.service.MyUserDetailsService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {
	
	private AuthenticationManager authenticationManager;

	private JwtUtil jwtTokenUtil;

	private MyUserDetailsService userDetailsService;
	
	AccountsRepository accountsRepository;

	@GetMapping("/hello")
	public String get() {
		return "Hello";
	}

	@GetMapping("/demo")
	public DataResponse<Menus> get2() {
		DataResponse response = new DataResponse();
		Menus menus = new Menus();
		menus.setId(1);
		menus.setName("Demo");
		menus.setLink("Link");
		response.setData(menus);
		response.setStatus(true);
		response.setMessage("Success");
		return response;
	}

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Tài khoản hoặc mật khẩu sai", e);
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(jwt));
	}
	
	@PostMapping("/createAccount")
	public DataResponse<Accounts> createAccounts(@RequestBody Accounts accounts) {
		List<Accounts> account = this.accountsRepository.findAll();
		for (Accounts a : account) {
			if (a.getEmail().contentEquals(accounts.getEmail())) {
				return new DataResponse<>(false, "Email is exists", accounts);
			}
			if (a.getUsername().contentEquals(accounts.getUsername())) {
				return new DataResponse<>(false, "Username is exists", accounts);
			}
		}
		accounts.setIsDelete(false);
		return new DataResponse<>(true, "Success", this.accountsRepository.save(accounts));
	}
}
