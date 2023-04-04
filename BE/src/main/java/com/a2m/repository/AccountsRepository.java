package com.a2m.repository;

import com.a2m.entities.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountsRepository extends JpaRepository<Accounts,Long> {
    public List<Accounts> findByUsername(String username);
}
