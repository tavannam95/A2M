package com.a2m.nhom1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.nhom1.entities.Category;

public interface CategoryService {
	List<Category> findAll();
	Category save(Category category);
	Category findById(Long id);
}
