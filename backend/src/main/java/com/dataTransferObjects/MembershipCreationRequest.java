package com.dataTransferObjects;

import java.time.LocalDate;

import com.entities.Membership.MembershipType;

public class MembershipCreationRequest {
    private LocalDate expirationDate;
    private MembershipType membershipType;

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public MembershipType getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(MembershipType membershipType) {
        this.membershipType = membershipType;
    }
}

