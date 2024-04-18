// CatalogTabs.js
import React from 'react';
import '../../styles/Tabs/Catalogs.css'; 

const CatalogTabs = ({ activeCatalogs, loadRecipesForCatalog }) => {
  return (
    <div className="catalog-buttons">
      {activeCatalogs.map((catalog, index) => (
        <button key={index} onClick={() => loadRecipesForCatalog(catalog)}>
          {catalog}
        </button>
      ))}
    </div>
  );
};

export default CatalogTabs;
