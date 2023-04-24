package com.a2m.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.entities.Fares;

import java.util.List;

@Repository
public interface FareRepository extends JpaRepository<Fares, Long>{
    List<Fares> findByIsHoliday(Boolean isHoliday);
}
