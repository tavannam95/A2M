package com.a2m.nhom1.repository;

import org.springframework.data.jpa.repository.support.CrudMethodMetadata;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.a2m.nhom1.entity.*;

@Repository
public interface UserRepository extends CrudRepository<Person, Integer>{
	
}