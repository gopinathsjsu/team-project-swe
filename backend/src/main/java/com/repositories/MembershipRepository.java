package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Membership;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
   
    // derived query to get membership for a user
    Membership findByUserUserId(Long userId);

    // derived query to delete membership for a user
    void deleteByUserUserId(Long userId);

}
