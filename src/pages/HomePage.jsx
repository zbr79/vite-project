import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/HomePage.css';
import Tabs from '../components/Tabs';




function HomePage() {

    return (
        <div>
            <Header />
            <Header />



            <Tabs />




            <Footer />
        </div>
    );
}

export default HomePage;
