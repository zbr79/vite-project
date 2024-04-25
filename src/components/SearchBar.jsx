import React, { useState, useEffect } from 'react';
import recipeData from '../../public/catalogs/最新.json';
import 热门 from '../../public/catalogs/热门.json';

import '../styles/SearchBar.css'; 
// More imports...

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]); // Start with an empty array
  
    useEffect(() => {
      // No initial set of recipes, let it stay empty initially
    }, []);
  
    const handleChange = (event) => {
      const query = event.target.value;
      setInput(query);
      if (!query) {
        setRecipes([]); // Clear recipes if query is empty
      } else {
        const filteredRecipes = recipeData.recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        setRecipes(filteredRecipes);
      }
    };
  
    return (
      <div>
        <input 
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search recipes..."
        />
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.name}>{recipe.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
export default SearchBar;
