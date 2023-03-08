package com.a2m.nhom1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.ui.Model;
import repository.UserRepository;

@Controller
@RequestMapping("/UserPage")
public class UserPageController{
	@Autowired
	
	UserRepository userrepository;
	public String showUserPageController(Model model) {
		model.addAttribute("persons",userrepository.findAll());
		return "/UserPage";
	}
}