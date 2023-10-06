package com.team_swe_project.examples.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team_swe_project.examples.jpa.UserEntity;

@Repository
public interface UserRepository extends JpaRepository < UserEntity, Long > {
    UserEntity findByEmail(String email);
}
