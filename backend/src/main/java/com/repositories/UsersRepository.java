package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Users;


public interface UsersRepository extends JpaRepository<Users, Long> {
}
