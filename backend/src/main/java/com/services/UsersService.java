package com.services;

import org.springframework.stereotype.Service;

import java.util.List;

import com.entities.Users;
import com.entities.Users.Role;
import com.repositories.UsersRepository;

@Service
public class UsersService {

    UsersRepository userRepository; 

    public UsersService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    // get all users
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    // get user by its id
    public Users findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // create a user
    public Users createUser(String username, String password, Role role) {
        Users user = new Users(username, password, role);

        return userRepository.save(user);
    }
    
}
