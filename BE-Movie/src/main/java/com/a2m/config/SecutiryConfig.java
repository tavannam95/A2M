package com.a2m.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.a2m.jwt.JwtFilter;

import lombok.AllArgsConstructor;

@EnableWebSecurity
//@AllArgsConstructor
public class SecutiryConfig {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	JwtFilter jwtFilter;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
		.authorizeRequests().antMatchers("/api/v1/auth/**","/api/v1/showtime/**").permitAll()
		.antMatchers("/api/v1/movie/**").hasAnyRole("EMPLOYEE","ADMINSTRATOR")
		.antMatchers("/api/v1/account/**","/api/v1/room/**").hasRole("ADMINSTRATOR")
//		.antMatchers("/authoAd").hasRole("ADMINSTRATOR")
		.anyRequest().authenticated()

//		.authorizeRequests()
//		.anyRequest().permitAll()
		.and()
		.exceptionHandling()
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

}
