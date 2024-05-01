import React, { useState } from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import 最新 from '../../public/catalogs/最新.json';
import 热门 from '../../public/catalogs/热门.json';

const Header = () => {
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showSearch, setShowSearch] = useState(false); // Toggle for showing the search bar
    const navigate = useNavigate();

    const handleChange = (event) => {
        const query = event.target.value;
        setInput(query);
        if (!query) {
            setRecipes([]);
        } else {
            const allRecipes = [...最新.recipes, ...热门.recipes];
            const filteredRecipes = allRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(query.toLowerCase())
            );
            setRecipes(filteredRecipes);
        }
    };

    return (
        <header className="app-header">
            <div className="menu-log" style={{ flex: 1 }}>
                <img src="./icons/menu.svg" alt="Menu" />
            </div>
            {!showSearch ? (
                <h1 className="main-logo" style={{ flex: 2, cursor: 'pointer' }}>
                    <img src="./icons/rensrecipe.png" alt="Logo" style={{ height: '100%' }} />
                </h1>
            ) : (
                <div className="search-bar" style={{ flex: 2 }}>
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
                                onClick={() => {
                                    navigate('/recipe', { state: recipe });
                                    setShowSearch(false); // Optionally close the search bar after selection
                                }}>
                                <img src={recipe.picture} alt={recipe.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                {recipe.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="search-logo" style={{ flex: 1 }} onClick={() => setShowSearch(!showSearch)}>
                <img src="./icons/search.svg" alt="Search" />
            </div>
        </header>
    );
};

export default Header;
