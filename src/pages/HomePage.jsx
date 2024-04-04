import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import RecipeTypeSelector from '../components/RecipeTypeSelector.jsx'; // Make sure the path is correct
import CatalogSelector from '../components/CatalogSelector.jsx'; // Make sure the path is correct
import RecipeList from '../components/RecipeList.jsx'; // Make sure the path is correct

function HomePage() {
    const [selectedFile, setSelectedFile] = useState('k1.json');
    const [recipeTypes, setRecipeTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('HOT');
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/recipeTypesConfig.json`)
            .then(response => response.json())
            .then(data => setRecipeTypes(data))
            .catch(error => console.error("Failed to load types config", error));
    }, []);

    useEffect(() => {
        fetch(`/${selectedFile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSelectedRecipes(data.recipes || []);
            })
            .catch(error => console.error("Failed to load recipe data", error));
    }, [selectedFile]);

    const handleRecipeSelect = (recipe) => {
        navigate('/recipe', { state: { recipe } });
    };

    return (
        <div>
            <Header />
            <RecipeTypeSelector recipeTypes={recipeTypes} setSelectedType={setSelectedType} />
            <CatalogSelector selectedType={selectedType} recipeTypes={recipeTypes} setSelectedFile={setSelectedFile} />
            <RecipeList recipes={selectedRecipes} onRecipeSelect={handleRecipeSelect} />
            <Footer />
        </div>
    );
}

export default HomePage;
