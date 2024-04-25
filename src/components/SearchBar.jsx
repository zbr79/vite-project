import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 最新 from '../../public/catalogs/最新.json';
import 热门 from '../../public/catalogs/热门.json';
// import 其他 from '../../public/catalogs/其他.json';

import '../styles/SearchBar.css'; 

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]); // Start with an empty array

    const navigate = useNavigate();

    const handleChange = (event) => {
        const query = event.target.value;
        setInput(query);
        if (!query) {
            setRecipes([]); // Keep recipes empty if query is empty
        } else {
            // Combine data only when there is a query to avoid initial full list display
            const allRecipes = [...最新.recipes, ...热门.recipes,];
            const filteredRecipes = allRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(query.toLowerCase())
            );
            setRecipes(filteredRecipes);
        }
    };

    return (
        <div className ="SearchBar-Section">
            <input 
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="搜索菜谱...."
            />
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index} 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                        onClick={() => navigate('/recipe', { state: recipe })}>
                        <img src={recipe.picture} alt={recipe.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        {recipe.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
  
export default SearchBar;
