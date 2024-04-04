import React from 'react';

function CatalogSelector({ selectedType, recipeTypes, setSelectedFile }) {
    const catalogs = recipeTypes.find(type => type.typeName === selectedType)?.catalogs || [];

    return (
        <div>
            {catalogs.map((catalog, index) => (
                <button key={index} onClick={() => setSelectedFile(catalog)}>
                    {catalog.replace('.json', '')}
                </button>
            ))}
        </div>
    );
}

export default CatalogSelector;
