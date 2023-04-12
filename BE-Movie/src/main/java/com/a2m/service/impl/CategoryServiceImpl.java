package com.a2m.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.entities.Categories;
import com.a2m.repository.CategoriesRepository;
import com.a2m.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
	
	@Autowired
	CategoriesRepository categoriesRepository;
	
	@Override
	public List<Categories> getListCategory() {
		// TODO Auto-generated method stub
		return categoriesRepository.findAll();
	}
	
}
