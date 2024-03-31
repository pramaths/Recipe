package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List; 

import com.example.demo.models.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    boolean existsByRecipeIdAndUserId(Long recipeId, Long userId);
    // You can add custom query methods if needed
    List<Rating> findByRecipeId(Long recipeId);
}
