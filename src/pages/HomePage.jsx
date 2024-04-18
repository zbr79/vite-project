import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/HomePage.css';
import Tabs from '../components/Tabs.jsx';
// import TypesTabs from '../components/Tabs/Types.jsx'




function HomePage() {

    return (
        <div className='HomePage'>


            {/* <Header /> */}
            <Tabs />
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;
