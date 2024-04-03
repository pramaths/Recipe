import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import MyFavorites from './components/MyFavorites';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
      </Routes>
    </Router>
  );
}

export default App;
