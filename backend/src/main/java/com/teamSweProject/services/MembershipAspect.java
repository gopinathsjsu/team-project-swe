package com.teamSweProject.services;

import com.teamSweProject.entities.Membership;
import com.teamSweProject.entities.Users;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Aspect
@Component
public class MembershipAspect {

    private final MembershipService membershipService;

    @Autowired
    public MembershipAspect(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @AfterReturning(pointcut = "execution(* com.teamSweProject.services.UsersService.createUser(..))", returning = "user")
    public void createMembership(Users user) {
        System.out.println("Aspect is running");
        if (user.getRole() != Users.Role.ROLE_ADMIN) {
            Membership.MembershipType membershipType = Membership.MembershipType.REGULAR_MEMBER;
            membershipService.createMembership(user.getUserId(), LocalDate.now().plusYears(1), membershipType);
        }
    }
}

