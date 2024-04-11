import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipePage = () => {
  const location = useLocation();
  const recipe = location.state; // Access the passed-down state
  
  // Check if the recipe data is available
  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.picture} alt={recipe.name} />
      
      {/* Render recipe sections, if available */}
      {recipe.sections && recipe.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <table>
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
      
      {/* Render recipe steps, if available */}
      <div>
        <h2>Steps:</h2>
        <ol>
          {recipe.steps && recipe.steps.map((step, stepIndex) => (
            <li key={stepIndex}>
              <p>{step.description}</p>
              {step.picture && <img src={step.picture} alt={`Step ${stepIndex + 1}`} />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
