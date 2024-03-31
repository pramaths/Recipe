package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Rating;
import com.example.demo.repositories.RatingRepository;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingRepository ratingRepository;

    public RatingController(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Rating>> getAllRatings() {
        List<Rating> ratings = ratingRepository.findAll();
        return ResponseEntity.ok(ratings);
    }

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
        Rating savedRating = ratingRepository.save(rating);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRating);
    }

    @PostMapping("/give-rating")
    public ResponseEntity<Rating> giveRating(@RequestParam Long recipeId,
                                              @RequestParam Long userId,
                                              @RequestParam BigDecimal ratingValue) {
        // Check if the rating for the given recipe and user already exists
        boolean existingRating = ratingRepository.existsByRecipeIdAndUserId(recipeId, userId);
        if (existingRating) {
            return ResponseEntity.badRequest().body(null); // Return bad request if rating already exists
        }

        Rating newRating = new Rating();
        newRating.setRecipeId(recipeId);
        newRating.setUserId(userId);
        newRating.setRating(ratingValue);

        Rating savedRating = ratingRepository.save(newRating);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRating);
    }
    @GetMapping("/get-rating")
    public ResponseEntity<Double> getRatingForRecipe(@RequestParam Long recipeId) {
        // Find all ratings for the given recipeId
        List<Rating> ratings = ratingRepository.findByRecipeId(recipeId);
    
        // Check if ratings exist for the recipe
        if (ratings.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 if no ratings found for the recipe
        }
    
        // Calculate the average rating
        double totalRating = 0;
        for (Rating rating : ratings) {
            totalRating += rating.getRating().doubleValue();
        }
        double averageRating = totalRating / ratings.size();
    
        return ResponseEntity.ok(averageRating);
    }
    
}
