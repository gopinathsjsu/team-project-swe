package com.teamSweProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Users;
import java.util.Optional;


public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
