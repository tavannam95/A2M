package com.a2m.util;

import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;

import com.a2m.entities.Accounts;

public class SecurityUtils {
	public static Optional<Accounts> getLoggedUser() {
		if (SecurityContextHolder.getContext().getAuthentication() == null) {
			return Optional.empty();
		}
		Accounts currentUserDetails = (Accounts) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		return Optional.of(currentUserDetails);
	}
}
