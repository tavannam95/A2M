package com.a2m.service;

import com.a2m.entities.Accounts;
import com.a2m.entities.Roles;
import com.a2m.repository.AccountsRepository;
import com.a2m.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
    AccountsRepository accountsRepository;

	@Autowired
    RolesRepository rolesRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<Accounts> account = accountsRepository.findByUsername(username);
        
        
        if (account.isEmpty()) {
            System.out.println("account not found! " + username);
            throw new UsernameNotFoundException("Account " + username + " was not found in the database");
        }

//		List<Roles> roles = rolesRepository.findAll();
//
//        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//		if (!roles.isEmpty()) {
//			for (Roles role : roles) {
//                GrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
//                grantedAuthorities.add(authority);
//			}
//		}
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        if (account.get(0).getRole() == null) {
        	throw new AccessDeniedException("Người dùng này chưa được phân quyền");
        }
        GrantedAuthority authority = new SimpleGrantedAuthority(account.get(0).getRole().getName());
                grantedAuthorities.add(authority);
        UserDetails userDetails = (UserDetails) new User(account.get(0).getUsername(), account.get(0).getPassword(),
                grantedAuthorities);
        return userDetails;
    }
}
