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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>{recipe.name}</div>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevents the navigate action from firing when the button is clicked
              console.log('Button clicked'); // Placeholder for future functionality
            }} className="add-button">+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCards;
