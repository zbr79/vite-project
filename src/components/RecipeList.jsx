import React from 'react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onRecipeSelect }) {
    return (
        <div>
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} onRecipeSelect={onRecipeSelect} />
            ))}
        </div>
    );
}

export default RecipeList;
