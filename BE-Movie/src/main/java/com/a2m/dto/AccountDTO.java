package com.a2m.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountDTO {
	private Long id;
	private String fullname;
	private String userName;
	private String email;
	private Date birthDate;
	private Boolean gender;
	private String phone;
	private String photo;
	
	
}
