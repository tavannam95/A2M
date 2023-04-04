package com.a2m.service;

import com.a2m.entities.Accounts;
import com.a2m.entities.Roles;
import com.a2m.repository.AccountsRepository;
import com.a2m.repository.RolesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@Slf4j
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    AccountsRepository accountsRepository;

    RolesRepository rolesRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<Accounts> account = accountsRepository.findByUsername(username);

        if (account.isEmpty()) {
            System.out.println("account not found! " + username);
            throw new UsernameNotFoundException("Account " + username + " was not found in the database");
        }

        log.info("Account info: "+account);

//        String role = account.getRole();

		List<Roles> roles = rolesRepository.findAll();

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		if (!roles.isEmpty()) {
			for (Roles role : roles) {
                GrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
                grantedAuthorities.add(authority);
			}
		}
        UserDetails userDetails = (UserDetails) new User(account.get(0).getUsername(), account.get(0).getPassword(),
                grantedAuthorities);
        return userDetails;
    }
}
