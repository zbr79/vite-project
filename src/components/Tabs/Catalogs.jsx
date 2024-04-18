import React, { useState } from 'react';
import '../../styles/Tabs/Catalogs.css'; 

const CatalogTabs = ({ activeCatalogs, loadRecipesForCatalog }) => {
  const [activeCatalog, setActiveCatalog] = useState(null);

  const handleCatalogClick = (catalog) => {
    setActiveCatalog(catalog); // Set the active catalog
    loadRecipesForCatalog(catalog); // Load the recipes for the clicked catalog
  };

  return (
    <div className="catalog-buttons">
      {activeCatalogs.map((catalog, index) => (
        <button 
          key={index} 
          onClick={() => handleCatalogClick(catalog)}
          className={catalog === activeCatalog ? 'active' : ''}
        >
          {catalog}
        </button>
      ))}
    </div>
  );
};

export default CatalogTabs;
