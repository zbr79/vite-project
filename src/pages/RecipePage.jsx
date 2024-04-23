import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/RecipePage.css'; // Ensure this path matches the location of your CSS file

import RecipeInfo from '../components/Recipe/Info.jsx';

import RecipeChart from '../components/Recipe/Chart.jsx';
import RecipeSteps from '../components/Recipe/Steps';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const RecipePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state;

  const goBack = () => {
    navigate(-1);
  };

  if (!recipe) {
    return (
      <div className="recipe-page">
        <button onClick={goBack} className="back-button">Back</button>
        <div className="no-recipe">No recipe data available.</div>
      </div>
    );
  }

  return (


    <div className="recipe-page">
      
      <Header />
      <button onClick={goBack} className="back-button">Back</button>

      <RecipeInfo recipe ={recipe}/>
      
      <RecipeChart recipe ={recipe}/>
      <RecipeSteps recipe ={recipe}/>

      <Footer />

      
    </div>




  );
};

export default RecipePage;
