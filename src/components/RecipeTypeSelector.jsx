import React from 'react';

function RecipeTypeSelector({ recipeTypes, setSelectedType }) {
    return (
        <div>
            {recipeTypes.map((type, index) => (
                <button key={index} onClick={() => setSelectedType(type.typeName)}>
                    {type.typeName}
                </button>
            ))}
        </div>
    );
}

export default RecipeTypeSelector;
