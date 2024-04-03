import React, { useState, useEffect } from 'react';
import './MyFavorites.css'; // Import a CSS file for styling

function MyFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in localStorage.');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/user-favorites/user/${userId}/favorites`);
        if (response.ok) {
          const data = await response.json();
          // Remove duplicates based on recipe ID
          const uniqueFavorites = removeDuplicates(data, 'id');
          setFavorites(uniqueFavorites);
          setLoading(false);
        } else {
          console.error('Failed to fetch favorites:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    }

    fetchFavorites();
  }, []);

  // Function to remove duplicates based on a specified key
  function removeDuplicates(array, key) {
    return array.filter((item, index, self) =>
      index === self.findIndex((i) => (
        i[key] === item[key]
      ))
    );
  }

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map(favorite => (
            <li key={favorite.id} className="favorite-item">
              <h2>{favorite.title}</h2>
              <p><strong>Ingredients:</strong> {favorite.ingredients}</p>
              <p><strong>Instructions:</strong> {favorite.instructions}</p>
              <p><strong>Cooking Time:</strong> {favorite.cooking_time} minutes</p>
              <p><strong>Difficulty Level:</strong> {favorite.difficultyLevel}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyFavorites;
