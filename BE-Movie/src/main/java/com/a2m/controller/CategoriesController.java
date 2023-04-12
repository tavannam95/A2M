package com.a2m.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.entities.Categories;
import com.a2m.service.CategoryService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/categories")
public class CategoriesController {
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping(value = "/listCategories")
	List<Categories> listCategories(){
		return categoryService.getListCategory();
		
	}
}
