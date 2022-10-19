package com.insurance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.insurance.entity.Policy;
import com.insurance.entity.Question;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer>{
	
	
	@Query(value = "SELECT * FROM query WHERE user_id = ?1", nativeQuery = true)
    public List<Question> findQuesByUserId(int uid);
}