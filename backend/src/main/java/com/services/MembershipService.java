package com.services;

import java.time.LocalDate;
import java.util.List;

import javax.management.InstanceAlreadyExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entities.Membership;
import com.entities.Users;
import com.entities.Membership.MembershipType;
import com.repositories.MembershipRepository;

@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final UsersService usersService;

    @Autowired
    public MembershipService(MembershipRepository membershipRepository, UsersService usersService) {
        this.membershipRepository = membershipRepository;
        this.usersService = usersService;
    }

    // get all membership records
    public List<Membership> getAllMembershipRecords() {
        return membershipRepository.findAll();
    }

    // create new membership for a given user
    public Membership createMembership(Long userId, LocalDate expirationDate, MembershipType membershipType) {

        Users user = usersService.findUserById(userId);

        MembershipType defaultType = MembershipType.NON_MEMBER; // Provide a default type
        Membership membership = new Membership(expirationDate, membershipType != null ? membershipType : defaultType, user);
        
        return membershipRepository.save(membership);

    }

    public boolean hasMembership(Long userId) {

        Membership existingMembership = membershipRepository.findByUserUserId(userId);

        return existingMembership != null;
    }

    // get a specific user's membership record
    public Membership findByUserId(Long userId) {
        return membershipRepository.findByUserUserId(userId);
    }

    

    // get a specific membership record via its id
    public Membership getMembershipById(Long id) {
        return membershipRepository.findById(id).orElse(null);
    }

    // delete membership record from db
    public boolean deleteMembershipById(Long id) {
        
        try {
            membershipRepository.deleteById(id);
            return true; // Deletion was successful
        } catch (Exception e) {
            return false; // Deletion failed
        }
        
    }

    // save membership record in db

}
