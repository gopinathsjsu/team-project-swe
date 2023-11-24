package com.security.services;

import com.entities.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Long userId;
    private String username;
    private String password;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long userId, String username, String password, String email, Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(Users user) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString()));
        return new UserDetailsImpl(user.getUserId(), user.getUsername(), user.getPassword(), user.getEmail(), authorities);
    }

    public Long getUserId() { return this.userId; }

    @Override
    public String getUsername() { return this.username; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() { return this.password; }

    public String getEmail() { return this.email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(userId, user.userId);
    }
}
