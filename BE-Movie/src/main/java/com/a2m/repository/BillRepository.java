package com.a2m.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a2m.entities.Bills;

public interface BillRepository extends JpaRepository<Bills, Long>{

}
