package com.teamSweProject.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity(name="membership")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long membershipId;
    private LocalDate expirationDate;

    @Enumerated(EnumType.STRING)
    private MembershipType type;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Users user;

    public Membership(LocalDate expirationDate, MembershipType membershipType, Users user) {
        this.expirationDate = expirationDate;
        this.type = membershipType;
        this.user = user;
    }

    public Membership() { }

    public Long getMembershipId() { return this.membershipId; }

    @JsonManagedReference
    public Users getUser() { return this.user; }
    public void setUser(Users user) { this.user = user; }
     
    public Long getUserId() { return this.user.getUserId(); }

    public LocalDate getExpirationDate() { return this.expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }

    public MembershipType getMembershipType() { return this.type; }
    public void setMembershipType(MembershipType memershipType) { this.type = memershipType; }

    public enum MembershipType {
        REGULAR_MEMBER,
        PREMIUM_MEMBER
    }
}
