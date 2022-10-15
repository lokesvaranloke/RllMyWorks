package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/insurance")
public class RestApiController {

	@Autowired
	UserRepository userRepo;
	
	@CrossOrigin(value = "http://localhost:4200/")
	@GetMapping(value = "/user")
	public List<User> getAllUser() {
		return userRepo.findAll();
	}
	
	@CrossOrigin(value = "http://localhost:4200/")
	@GetMapping(value = "/user/{userId}")
	public User getUserById(@PathVariable("userId") Integer userId) {
		Optional<User> optionalUser = userRepo.findById(userId);
		
		if(optionalUser.isEmpty()) {
			throw new UserNotFoundException(userId);
		}
		return optionalUser.get();
	}
	
	@CrossOrigin(value = "http://localhost:4200/")
	@PostMapping(value = "/user")
	public User addUser(@RequestBody User user) {
		return userRepo.save(user);
	}
	
	@CrossOrigin(value = "http://localhost:4200/")
	@PutMapping(value = "/user")
	public User updateUser(@RequestBody User user) {
		return userRepo.save(user);
	}
	
	@CrossOrigin(value = "http://localhost:4200/")
	@DeleteMapping(value = "/user/{userId}")
	public void deleteUser(@PathVariable("userId") Integer userId) {
		userRepo.deleteById(userId);
	}
}
