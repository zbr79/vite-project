import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



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
        if (data.length > 0) {
          setActiveTab(data[0].typeName);
          setActiveCatalogs(data[0].catalogs);
        }
      })
      .catch(error => console.error("Failed to fetch tabs data", error));
  }, []);

  const selectTab = (typeName, catalogs) => {
    setActiveTab(typeName);
    setActiveCatalogs(catalogs);
    // Optionally reset recipes when switching tabs
    setRecipes([]);
  };

  const loadRecipesForCatalog = (catalogName) => {
    // Adjust the path to where your catalog JSON files are stored
    fetch(`./catalogs/${catalogName}.json`)
      .then(response => response.json())
      .then(data => {
        console.log(`Recipes loaded for ${catalogName}:`, data.recipes); // Debugging line
        setRecipes(data.recipes);
      })
      .catch(error => console.error(`Failed to fetch recipes for ${catalogName}`, error));
  };

  return (
    <div>
      <div className="tab-buttons">
        {tabData.map(({ typeName, catalogs }) => (
          <button key={typeName} onClick={() => selectTab(typeName, catalogs)}>
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
      <div className="recipe-buttons">
  {recipes.map((recipe, index) => (
    <button key={index} onClick={() => navigate('/recipe', { state: recipe })}>
      {recipe.name}
    </button>
  ))}
</div>
    </div>
  );
};

export default Tabs;
