package com.sdts_backend.service;

import java.util.Optional;

import com.sdts_backend.entity.User;

public interface UserService {
	User register(String username, String email, String password);
	Optional<User> findByEmail(String email);
	User login(String email, String password);
}