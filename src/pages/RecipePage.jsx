import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Recipe.css'; // Ensure this path matches the location of your CSS file

import RecipeInfo from '../components/Recipe/RecipeInfo';

const RecipePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state;

  const goBack = () => {
    navigate(-1);
  };

  if (!recipe) {
    return (
      <div className="recipe-page">
        <button onClick={goBack} className="back-button">Back</button>
        <div className="no-recipe">No recipe data available.</div>
      </div>
    );
  }

  return (
    <div className="recipe-page">
      <button onClick={goBack} className="back-button">Back</button>

      <RecipeInfo recipe ={recipe}/>

      
      <div className="recipe-body">
        {recipe.sections && recipe.sections.map((section, index) => (
          <div key={index} className="section">
            <h2>{section.title}</h2>
            <table className="ingredients-table">
              <tbody>
                {section.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        
        <div className="recipe-steps">
          <h2>Steps:</h2>
          <ol>
            {recipe.steps && recipe.steps.map((step, stepIndex) => (
              <li key={stepIndex}>
                <p>{step.description}</p>
                {step.picture && <img src={step.picture} alt={`Step ${stepIndex + 1}`} className="step-image" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
