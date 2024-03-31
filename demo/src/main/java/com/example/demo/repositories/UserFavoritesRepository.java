package com.example.demo.repositories;
import java.util.List; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.UserFavorites;

@Repository
public interface UserFavoritesRepository extends JpaRepository<UserFavorites, Long> {
    List<UserFavorites> findByUserId(Long userId);
}