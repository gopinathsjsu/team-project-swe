package com.entities;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity(name="membership")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long membershipId;
    private LocalDate expirationDate;

    @Enumerated(EnumType.STRING)
    private MembershipType type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    public Membership(LocalDate expirationDate, MembershipType membershipType, Users user) {
        this.expirationDate = expirationDate;
        this.type = membershipType;
        this.user = user;
    }

    public Membership() { }

    public Long getMembershipId() { return this.membershipId; }

    public Users getUser() { return this.user; }
    public Long getUserId() { return this.user.getUserId(); }

    public LocalDate getExpirationDate() { return this.expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }

    public MembershipType getMembershipType() { return this.type; }
    public void setMembershipType(MembershipType memershipType) { this.type = memershipType; }

    public enum MembershipType {
        NON_MEMBER,
        PREMIUM_MEMBER
    }
}
