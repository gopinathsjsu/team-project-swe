package com.services;

import java.time.LocalDate;
import java.util.List;

import javax.management.InstanceNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dataTransferObjects.MembershipCreationRequest;
import com.entities.Membership;
import com.entities.Users;
import com.entities.Membership.MembershipType;
import com.repositories.MembershipRepository;

@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final UsersService usersService;
    private static final Logger logger = LoggerFactory.getLogger(MembershipService.class);

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

    // delete membership record based on membership id
    public void deleteMembership(Long id) throws InstanceNotFoundException {

        try {

            Membership membership = membershipRepository.findById(id).orElseThrow(InstanceNotFoundException::new);

            // dissociate membership from user 
            // membership.setUser(null);
            membershipRepository.save(membership);

            // now delete membership
            membershipRepository.deleteById(id);
            
            
        } catch (Exception e) {
            logger.error("Failed to delete membership", e);

        }
    }

    // update membership for a user
    public Membership updateMembership(Long userId, MembershipCreationRequest membershipUpdateRequest) {
       
        Membership existingMembership = findByUserId(userId);

        if (existingMembership != null) {
            existingMembership.setExpirationDate(membershipUpdateRequest.getExpirationDate());
            existingMembership.setMembershipType(membershipUpdateRequest.getMembershipType());

            // Save the updated membership
            return membershipRepository.save(existingMembership);
        }

        return null; 

    }

    // other API endpoints.. 
}
