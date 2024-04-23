import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Tabs/RecipeCards.css'; 

const RecipeCards = ({ recipes }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleAddClick = (e, recipe) => {
    e.stopPropagation(); // Prevents the navigate action from firing when the button is clicked
    console.log(`Added ${recipe.name} to cart`); // Placeholder for actual add to cart functionality
    setShowMessage(true);

    // Clear any existing timeouts to reset the timer
    if (timeoutId) clearTimeout(timeoutId);

    // Hide the message after 3 seconds
    const newTimeoutId = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="recipe-cards">
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card" onClick={() => navigate('/recipe', { state: recipe })}>
          <img src={recipe.picture} alt={recipe.name} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>{recipe.name}</div>
            <button onClick={(e) => handleAddClick(e, recipe)} className="add-button">+</button>
          </div>
        </div>
      ))}
      {showMessage && <div className="message">Added to cart</div>}
    </div>
  );
};

export default RecipeCards;
