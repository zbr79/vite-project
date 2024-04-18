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
        if (data && data.length > 0) {
          // Try to set "推荐" as the default tab
          const recommendedTab = data.find(tab => tab.typeName === '推荐');
          if (recommendedTab) {
            setActiveTab(recommendedTab.typeName);
            // Try to set "最新" as the default catalog within "推荐"
            const latestCatalog = recommendedTab.catalogs.find(catalog => catalog === '最新');
            if (latestCatalog) {
              setActiveCatalogs([latestCatalog]);
              loadRecipesForCatalog(latestCatalog); // Directly load recipes for the default catalog
            } else if (recommendedTab.catalogs && recommendedTab.catalogs.length > 0) {
              setActiveCatalogs([recommendedTab.catalogs[0]]);
              loadRecipesForCatalog(recommendedTab.catalogs[0]); // Load recipes for the first catalog if "最新" is not found
            } else {
              setActiveCatalogs([]);
            }
          } else {
            setActiveTab(data[0].typeName);
            setActiveCatalogs(data[0].catalogs.length > 0 ? [data[0].catalogs[0]] : []);
            if (data[0].catalogs.length > 0) {
              loadRecipesForCatalog(data[0].catalogs[0]); // Load recipes for the first catalog of the first tab
            }
          }
        } else {
          console.error("No tab data available");
          setActiveTab('');
          setActiveCatalogs([]);
        }
      })
      .catch(error => {
        console.error("Failed to fetch tabs data", error);
        setActiveTab('');
        setActiveCatalogs([]);
      });
  }, []);

  useEffect(() => {
    // This useEffect will trigger when `activeCatalogs` changes,
    // which includes after setting the default catalog.
    if (activeCatalogs.length > 0) {
      loadRecipesForCatalog(activeCatalogs[0]);
    }
  }, [activeCatalogs]); // Only run when activeCatalogs changes

  const selectTab = (typeName, catalogs) => {
    setActiveTab(typeName);
    setActiveCatalogs(catalogs);
    setRecipes([]); // Optionally reset recipes when switching tabs
  };

  const loadRecipesForCatalog = (catalogName) => {
    fetch(`./catalogs/${catalogName}.json`)
      .then(response => response.json())
      .then(data => {
        console.log(`Recipes loaded for ${catalogName}:`, data.recipes);
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