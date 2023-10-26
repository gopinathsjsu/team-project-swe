package com.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Membership;
import com.entities.Users;
import com.entities.Membership.MembershipType;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
   
    // derived query to get membership for a user
    Membership findByUserId(Long userId);

    // derived query to create a membership for a user
    Membership createMembership(Users user, LocalDate expirationDate, MembershipType membershipType);
}
