package com.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entities.Membership;
import com.entities.Users;
import com.entities.Membership.MembershipType;
import com.repositories.MembershipRepository;

@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;

    @Autowired
    public MembershipService(MembershipRepository membershipRepository) {
        this.membershipRepository = membershipRepository;
    }

    // get all membership records
    public List<Membership> getAllMembershipRecords() {
        return membershipRepository.findAll();
    }

    // create new membership for a given user
    public Membership createMembership(Users user, LocalDate expirationDate, MembershipType membershipType) {

        Membership membership = new Membership(expirationDate, membershipType, user);

        return membershipRepository.save(membership);

    }

    // get a specific user's membership record
    public Membership findByUserId(Long userId) {
        return membershipRepository.findByUserId(userId);
    }

    

    // get a specific membership record via its id
    public Membership getMembershipById(Long id) {
        return membershipRepository.findById(id).orElse(null);
    }

    // delete membership record from db
    public void deleteMembershipById(Long id) {
        membershipRepository.deleteById(id);
    }

    // save membership record in db

}
