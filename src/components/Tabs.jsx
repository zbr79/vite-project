import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Tabs.css';

const Tabs = () => {
  const [tabData, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [activeCatalogs, setActiveCatalogs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

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
            } else if (recommendedTab.catalogs && recommendedTab.catalogs.length > 0) {
              setActiveCatalogs([recommendedTab.catalogs[0]]);
            } else {
              setActiveCatalogs([]);
            }
          } else {
            // Set the first available tab and its first catalog as default
            setActiveTab(data[0].typeName);
            setActiveCatalogs(data[0].catalogs.length > 0 ? [data[0].catalogs[0]] : []);
          }
        } else {
          // If no data is available, set everything to empty
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
    // Load recipes when activeCatalogs changes
    if (activeCatalogs.length > 0) {
      loadRecipesForCatalog(activeCatalogs[0]);
    }
  }, [activeCatalogs]); // Depend on activeCatalogs to trigger recipe loading

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
      <div className="tab-buttons">
        {tabData.map(({ typeName, catalogs }) => (
          <button key={typeName} onClick={() => selectTab(typeName, catalogs)}
            className={typeName === activeTab ? 'active' : ''}>
            {typeName}
          </button>
        ))}
      </div>
      <div className="catalog-buttons">
        {activeCatalogs.map((catalog, index) => (
          <button key={index} onClick={() => loadRecipesForCatalog(catalog)}>
            {catalog}
          </button>
        ))}
      </div>
      <div className="recipe-cards">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card" onClick={() => navigate('/recipe', { state: recipe })}>
            <img src={recipe.picture} alt={recipe.name} />
            <div>{recipe.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
