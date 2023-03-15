package com.a2m.nhom1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.nhom1.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	
}
