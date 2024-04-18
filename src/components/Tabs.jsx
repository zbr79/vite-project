// Tabs.js
import React, { useState, useEffect } from 'react';
import TypesTabs from '../components/Tabs/Types';
import CatalogTabs from '../components/Tabs/Catalogs';
import RecipeCards from './Tabs/RecipeCards';

const Tabs = () => {
  const [tabData, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [activeCatalogs, setActiveCatalogs] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('recipeTypes.json')
      .then(response => response.json())
      .then(data => {
        setTabData(data);
        // Additional logic for setting active tab and catalogs
      })
      .catch(error => console.error("Failed to fetch tabs data", error));
  }, []);

  const selectTab = (typeName, catalogs) => {
    setActiveTab(typeName);
    setActiveCatalogs(catalogs);
    setRecipes([]); // Optionally reset recipes when switching tabs
  };

  const loadRecipesForCatalog = (catalogName) => {
    fetch(`./catalogs/${catalogName}.json`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(error => {
        console.error(`Failed to fetch recipes for ${catalogName}`, error);
        setRecipes([]); // Reset recipes on error
      });
  };

  return (
    <div>
      <TypesTabs tabData={tabData} activeTab={activeTab} selectTab={selectTab} />
      <CatalogTabs activeCatalogs={activeCatalogs} loadRecipesForCatalog={loadRecipesForCatalog} />
      <RecipeCards recipes={recipes} />
    </div>
  );
};

export default Tabs;
