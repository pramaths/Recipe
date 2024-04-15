package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.demo.repositories.RecipeRepository;
import com.example.demo.dto.UserFavoritesDto;
import com.example.demo.models.Recipe;
import com.example.demo.models.UserFavorites;
import com.example.demo.repositories.UserFavoritesRepository;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/user-favorites")
public class UserFavoritesController {

    private final UserFavoritesRepository userFavoriteRepository;
    private final RecipeRepository recipeRepository;

    @Autowired
    public UserFavoritesController(UserFavoritesRepository userFavoriteRepository, RecipeRepository recipeRepository) {
        this.userFavoriteRepository = userFavoriteRepository;
        this.recipeRepository = recipeRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserFavorites> getUserFavoriteById(@PathVariable Long id) {
        UserFavorites userFavorite = userFavoriteRepository.findById(id).orElse(null);
        if (userFavorite != null) {
            return ResponseEntity.ok(userFavorite);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserFavorites>> getUserFavoritesByUserId(@PathVariable Long userId) {
        List<UserFavorites> userFavorites = userFavoriteRepository.findByUserId(userId);
        return ResponseEntity.ok(userFavorites);
    }

    @PostMapping
    public ResponseEntity<UserFavorites> createUserFavorite(@RequestBody UserFavorites userFavorite) {
        UserFavorites savedUserFavorite = userFavoriteRepository.save(userFavorite);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserFavorite);
    }

    @PostMapping("/dto")
    public ResponseEntity<UserFavorites> createUserFavoriteWithDto(@RequestBody UserFavoritesDto userFavoriteDto) {
        // Check if the provided recipeId is valid
        Recipe recipe = recipeRepository.findById(userFavoriteDto.getRecipeId()).orElse(null);
        if (recipe == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Create and save the UserFavorites instance
        UserFavorites userFavorite = new UserFavorites();
        userFavorite.setUserId(userFavoriteDto.getUserId());
        userFavorite.setRecipeId(userFavoriteDto.getRecipeId());
        UserFavorites savedUserFavorite = userFavoriteRepository.save(userFavorite);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserFavorite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserFavorite(@PathVariable Long id) {
        userFavoriteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/favorites")
    public ResponseEntity<List<Recipe>> getUserFavoriteRecipes(@PathVariable Long userId) {
        List<UserFavorites> userFavorites = userFavoriteRepository.findByUserId(userId);
        List<Long> recipeIds = userFavorites.stream()
                                            .map(UserFavorites::getRecipeId)
                                            .collect(Collectors.toList());

        List<Recipe> favoriteRecipes = new ArrayList<>();
        for(Long recipeId : recipeIds) {
            recipeRepository.findById(recipeId).ifPresent(favoriteRecipes::add);
        }

        if (favoriteRecipes.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(favoriteRecipes);
        }
    }
}
