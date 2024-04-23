import React from "react";
import '../../styles/RecipeComponents/Info.css'; // Ensure the correct path to the CSS file

const RecipeInfo = ({recipe}) => {
    return(
        <div className="recipe-header">
        <img src={recipe.picture} alt={recipe.name} className="recipe-image" />
        <h1 className="recipe-title-page">{recipe.name}</h1>
        {/* Displaying the number of servings below the recipe name */}
        <p className="recipe-servings">{recipe.servings}人份</p>
      </div>

    );
};

export default RecipeInfo;