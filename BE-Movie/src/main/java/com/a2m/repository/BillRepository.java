package com.a2m.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.entities.Bills;

@Repository
public interface BillRepository extends JpaRepository<Bills, Long>{
    Bills findByBillCode(String billCode);

    Bills findByBarCode(String barCode);
    
//    Bills findBillById(Long id);
    List<Bills> findByCustomerId(Long id);
}
