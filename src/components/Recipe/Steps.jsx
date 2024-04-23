import React from "react";
import '../../styles/RecipeComponents/Steps.css'; 

const RecipeSteps = ({recipe}) => {
    return(
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

    );
};

export default RecipeSteps;