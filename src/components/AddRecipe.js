import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

function AddRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cooking_time: '',
    difficulty_level: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // Navigate back to the recipes list
      navigate('/');
    } else {
      console.error('Failed to add recipe');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cooking Time (in minutes):</label>
          <input
            type="number"
            name="cooking_time"
            value={formData.cooking_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Difficulty Level:</label>
          <select
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
