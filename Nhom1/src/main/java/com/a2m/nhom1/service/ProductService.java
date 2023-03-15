package com.a2m.nhom1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.nhom1.entities.Product;
import com.a2m.nhom1.repository.ProductRepository;


@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	
	public List<Product> findAll(){
		return productRepository.findAll();
	}
	
	public Product insert(Product product) {
		return productRepository.save(product);
	}
	
	public Optional<Product> findById(Integer id){
		return productRepository.findById(id);
	}
	
	public void delete(Product product) {
		productRepository.delete(product);
	}
}