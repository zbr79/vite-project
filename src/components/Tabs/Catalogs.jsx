import React from 'react';
import '../../styles/Tabs/Catalogs.css'; // Ensure the correct path to the CSS file

const CatalogTabs = ({ catalogs, activeCatalog, setActiveCatalog, loadRecipesForCatalog }) => {
  if (!Array.isArray(catalogs)) {
    console.error('Catalogs should be an array, received:', catalogs);
    return <div>No catalogs available.</div>; // Fallback UI
  }

  return (
    <div className="catalog-section"> 
      {catalogs.map((catalog, index) => (
        <button
          key={index}
          className={catalog === activeCatalog ? 'active' : ''}
          onClick={() => {
            setActiveCatalog(catalog);
            loadRecipesForCatalog(catalog);
          }}
        >
          <span className="catalog-name">{catalog}</span>
        </button>
      ))}
    </div>
  );
};

export default CatalogTabs;
