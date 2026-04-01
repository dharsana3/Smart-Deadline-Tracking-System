package com.sdts_backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.sdts_backend.repository.UserRepository;
import com.sdts_backend.entity.User;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(String username, String email, String passwordHash) {

        Optional<User> existing = userRepository.findByEmail(email);

        if (existing.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);

        String encodedPassword = passwordEncoder.encode(passwordHash);
        user.setPasswordHash(encodedPassword);

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

	@Override
	public User login(String email, String password) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("No user found!"));
		if(passwordEncoder.matches(password,user.getPasswordHash()))
		{
			return user;
		}
		else
		{
			throw new RuntimeException("Invalid Password");
		}
	}
}