package com.a2m.nhom1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.a2m.nhom1.entities.Category;
import com.a2m.nhom1.service.CategoryService;

@Controller
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("")
	public ModelAndView index() {
		List<Category> listCategories = categoryService.findAll();
		ModelAndView mav = new ModelAndView("category/index");
		mav.addObject("listCategories", listCategories);
		return mav;
	}
	
	@GetMapping("/create")
	public ModelAndView create() {
		ModelAndView mav = new ModelAndView("category/create");
		return mav;
	}
	
	@PostMapping("/save-or-update")
	public ModelAndView save(@ModelAttribute Category category) {
		categoryService.save(category);
		ModelAndView mav = new ModelAndView("redirect:/category");
		return mav;
	}
	
	@GetMapping("/update/{id}")
	public ModelAndView update(
			@PathVariable("id") Long id
			) {
		Category category = categoryService.findById(id);
		ModelAndView mav = new ModelAndView("category/edit");
		mav.addObject("category", category);
		return mav;
	}
	
}
