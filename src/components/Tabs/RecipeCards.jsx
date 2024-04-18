// RecipeCards.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Tabs/RecipeCards.css'; 

const RecipeCards = ({ recipes }) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-cards">
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card" onClick={() => navigate('/recipe', { state: recipe })}>
          <img src={recipe.picture} alt={recipe.name} />
          <div>{recipe.name}</div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCards;
