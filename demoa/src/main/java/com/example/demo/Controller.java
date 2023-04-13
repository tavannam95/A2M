package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Controller {
	
	@GetMapping("/hello")
	public ModelAndView helo()
	{
		return new ModelAndView("/hello");
	}
}
