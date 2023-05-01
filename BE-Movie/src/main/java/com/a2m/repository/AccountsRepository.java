package com.a2m.repository;

import com.a2m.entities.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountsRepository extends JpaRepository<Accounts,Long> {
    List<Accounts> findByUsername(String username);
    
//    @Query("select st from accounts st where st.username = :username and st.email = email")
//    List<Accounts> findByUsernameAndEmail(String username, String email);
}
