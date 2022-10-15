package com.example.demo.exception;

public class UserNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNotFoundException(Integer userId) {
		super("User Not Found With userId : "+userId);
	}
}
