import React from 'react';

function RecipeCard({ recipe, onRecipeSelect }) {
    return (
        <div onClick={() => onRecipeSelect(recipe)}>
            <img src={recipe.picture} alt={recipe.name} />
            <div>{recipe.name}</div>
        </div>
    );
}

export default RecipeCard;
