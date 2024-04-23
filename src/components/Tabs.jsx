import React, { useState, useEffect } from 'react';
import TypesTabs from '../components/Tabs/Types';
import CatalogTabs from '../components/Tabs/Catalogs';
import RecipeCards from './Tabs/RecipeCards';

const Tabs = () => {
  const [tabData, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [catalogs, setCatalogs] = useState([]);  // Initializes catalogs to an empty array
  const [activeCatalog, setActiveCatalog] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('recipeTypes.json')
      .then(response => response.json())
      .then(data => {
        setTabData(data);
        if (data.length > 0) {
          const recommendedTab = data.find(tab => tab.typeName === '推荐');
          if (recommendedTab) {
            setActiveTab(recommendedTab.typeName);
            setCatalogs(recommendedTab.catalogs);  // Set all catalogs for the recommended tab
            const defaultCatalog = recommendedTab.catalogs.find(catalog => catalog === '最新') || recommendedTab.catalogs[0];
            if (defaultCatalog) {
              setActiveCatalog(defaultCatalog);
            }
          }
        }
      })
      .catch(error => {
        console.error("Failed to fetch tabs data", error);
      });
  }, []);

  useEffect(() => {
    if (activeCatalog) {
      loadRecipesForCatalog(activeCatalog);
    }
  }, [activeCatalog]);

  const selectTab = (typeName, catalogs) => {
    setActiveTab(typeName);
    setCatalogs(catalogs);
    setActiveCatalog(catalogs[0] || '');
    setRecipes([]);
  };

  const loadRecipesForCatalog = (catalogName) => {
    fetch(`./catalogs/${catalogName}.json`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(error => {
        console.error(`Failed to fetch recipes for ${catalogName}`, error);
        setRecipes([]);
      });
  };

  return (
    <div>
      <TypesTabs tabData={tabData} activeTab={activeTab} selectTab={selectTab} />
      <CatalogTabs catalogs={catalogs} activeCatalog={activeCatalog} setActiveCatalog={setActiveCatalog} loadRecipesForCatalog={loadRecipesForCatalog} />
      <RecipeCards recipes={recipes} />
    </div>
  );
};

export default Tabs;
