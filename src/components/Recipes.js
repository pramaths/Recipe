// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
// import './Recipes.css'; // Import a CSS file for styling
// import axios from 'axios';

// function Recipes() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState(''); // State to hold the username
//   const [showModal, setShowModal] = useState(false); // State to manage modal visibility
//   const [rating, setRating] = useState(0); // State to hold the rating value
//   const [selectedRecipeId, setSelectedRecipeId] = useState(null); // State to hold the selected recipe ID
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     async function fetchRecipes() {
//       try {
//         const response = await fetch('http://localhost:8080/api/recipes');
//         if (response.ok) {
//           const data = await response.json();

//           // Fetch ratings for each recipe
//           const recipesWithRatings = await Promise.all(
//             data.map(async (recipe) => {
//               const ratingResponse = await fetch(`http://localhost:8080/api/ratings/get-rating?recipeId=${recipe.id}`);
//               if (ratingResponse.ok) {
//                 const ratingData = await ratingResponse.json();
//                 return { ...recipe, rating: ratingData }; // Add rating to recipe object
//               } else {
//                 console.error(`Failed to fetch rating for recipe ${recipe.id}:`, ratingResponse.statusText);
//                 return recipe; // Return recipe without rating if rating fetch fails
//               }
//             })
//           );

//           setRecipes(recipesWithRatings);
//           setLoading(false);
//         } else {
//           console.error('Failed to fetch recipes:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error during fetch:', error);
//       }
//     }

//     fetchRecipes();
//   }, []);

//   useEffect(() => {
//     // Fetch user details based on user ID stored in localStorage
//     async function fetchUserDetails() {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (userId) {
//           const response = await fetch(`http://localhost:8080/api/users/${userId}`);
//           if (response.ok) {
//             const user = await response.json();
//             setUsername(user.username);
//           } else {
//             console.error('Failed to fetch user details:', response.statusText);
//           }
//         }
//       } catch (error) {
//         console.error('Error during fetch:', error);
//       }
//     }

//     fetchUserDetails();
//   }, []);

//   // Navigate to the form page for adding a new recipe
//   const handleAddRecipeClick = () => {
//     navigate('/add-recipe'); // Adjust the path as needed for your application
//   };

//   const handleAddToFavorites = (recipeId) => {
//     // Retrieve userId from localStorage
//     const userId = localStorage.getItem('userId');

//     // Check if userId exists
//     if (!userId) {
//       console.error('User ID not found in localStorage.');
//       return;
//     }

//     // Define the data to be sent in the request body
//     const requestData = {
//       userId: userId,
//       recipeId: recipeId
//     };

//     // Make POST request to the API endpoint
//     axios.post('/api/user-favorites', requestData)
//       .then(response => {
//         console.log('Recipe added to favorites successfully.');
//       })
//       .catch(error => {
//         console.error('Error adding recipe to favorites:', error);
//       });
//   };

//   // Function to navigate to user favorites page
//   const handleMyFavoritesClick = () => {
//     navigate('/my-favorites'); // Adjust the path as needed for your application
//   };

//   // Function to handle opening the modal for giving ratings
//   const handleGiveRating = (recipeId) => {
//     setSelectedRecipeId(recipeId);
//     setShowModal(true);
//   };

//   // Function to handle closing the modal
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setRating(0);
//   };

//   // Function to handle submitting the rating
//   const handleSubmitRating = async () => {
//     // Retrieve the user ID from localStorage
//     const userId = localStorage.getItem('userId');
//     // Log the details of the rating submission
//     console.log(`Submitting rating: Recipe ID = ${selectedRecipeId}, User ID = ${userId}, Rating Value = ${rating}`);

//     try {
//       const response = await fetch(`http://localhost:8080/api/ratings/give-rating?recipeId=${selectedRecipeId}&userId=${userId}&ratingValue=${rating}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });
//       if (response.ok) {
//         console.log('Rating submitted successfully.');
//       } else {
//         console.error('Failed to submit rating:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during rating submission:', error);
//     }
//     handleCloseModal();
//   };

//   return (
//     <div className="recipes-container">
//       <h1>Welcome, {username}!</h1>
//       <div className="button-container">
//         <button onClick={handleAddRecipeClick} className="add-recipe-button">Add New Recipe</button>
//         <button onClick={handleMyFavoritesClick} className="add-recipe-button" style={{ marginLeft: "1rem" }}>My Favorites</button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="recipes-list">
//           {recipes.map(recipe => (
//             <li key={recipe.id} className="recipe-item">
//               <h2>{recipe.title}</h2>
//               <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
//               <p><strong>Instructions:</strong> {recipe.instructions}</p>
//               <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
//               <p><strong>Difficulty Level:</strong> {recipe.difficultyLevel}</p>
//               <p><strong>Average Rating:</strong> {recipe.rating}</p> {/* Display the average rating */}
//               <div className="button-container">
//                 <button onClick={() => handleAddToFavorites(recipe.id)} className="add-to-favorites-button">Add to Favorites</button>
//                 <button onClick={() => handleGiveRating(recipe.id)} className="give-rating-button">Give Rating</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* Modal for giving ratings */}
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>&times;</span>
//             <h2>Give Rating</h2>
//             <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
//             <button onClick={handleSubmitRating}>Submit Rating</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Recipes;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recipes.css';
import axios from 'axios';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('http://localhost:8080/api/recipes');
        if (response.ok) {
          const data = await response.json();

          const recipesWithRatings = await Promise.all(
            data.map(async (recipe) => {
              const ratingResponse = await fetch(`http://localhost:8080/api/ratings/get-rating?recipeId=${recipe.id}`);
              if (ratingResponse.ok) {
                const ratingData = await ratingResponse.json();
                return { ...recipe, rating: ratingData };
              } else {
                console.error(`Failed to fetch rating for recipe ${recipe.id}:`, ratingResponse.statusText);
                return recipe;
              }
            })
          );

          setRecipes(recipesWithRatings);
          setLoading(false);
        } else {
          console.error('Failed to fetch recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    }

    fetchRecipes();
  }, []);

  useEffect(() => {
    async function fetchUserDetails() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setUsername(user.username);
        } else {
          console.error('Failed to fetch user details:', response.statusText);
        }
      }
    }

    fetchUserDetails();
  }, []);

  const handleAddRecipeClick = () => {
    navigate('/add-recipe');
  };

  const handleAddToFavorites = (recipeId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }

    const requestData = {
      userId: parseInt(userId),
      recipeId: recipeId
    };

    axios.post('http://localhost:8080/api/user-favorites', requestData)
      .then(response => {
        console.log('Recipe added to favorites successfully.');
        alert('Recipe added to favorites!');
      })
      .catch(error => {
        console.error('Error adding recipe to favorites:', error);
        alert('Failed to add recipe to favorites.');
      });
  };

  const handleMyFavoritesClick = () => {
    navigate('/my-favorites');
  };

  const handleGiveRating = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRating(0);
  };

  const handleSubmitRating = async () => {
    const userId = localStorage.getItem('userId');
    console.log(`Submitting rating: Recipe ID = ${selectedRecipeId}, User ID = ${userId}, Rating Value = ${rating}`);

    try {
      const response = await fetch(`http://localhost:8080/api/ratings/give-rating?recipeId=${selectedRecipeId}&userId=${userId}&ratingValue=${rating}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log('Rating submitted successfully.');
        alert('Rating submitted successfully!');
      } else {
        console.error('Failed to submit rating:', response.statusText);
        alert('Failed to submit rating.');
      }
    } catch (error) {
      console.error('Error during rating submission:', error);
      alert('Error during rating submission.');
    }
    handleCloseModal();
  };

  return (
    <div className="recipes-container">
      <h1>Welcome, {username}!</h1>
      <div className="button-container">
        <button onClick={handleAddRecipeClick} className="add-recipe-button">Add New Recipe</button>
        <button onClick={handleMyFavoritesClick} className="add-recipe-button" style={{ marginLeft: "1rem" }}>My Favorites</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="recipes-list">
          {recipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <h2>{recipe.title}</h2>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
              <p><strong>Difficulty Level:</strong> {recipe.difficultyLevel}</p>
              <p><strong>Average Rating:</strong> {recipe.rating}</p>
              <div className="button-container">
                <button onClick={() => handleAddToFavorites(recipe.id)} className="add-to-favorites-button">Add to Favorites</button>
                <button onClick={() => handleGiveRating(recipe.id)} className="give-rating-button">Give Rating</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Give Rating</h2>
            <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
            <button onClick={handleSubmitRating}>Submit Rating</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipes;
