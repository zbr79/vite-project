import React, { useState, useEffect } from 'react';
import '../styles/Tabs.css'; // Make sure this path is correct

// Example image URLs or you can import local images
const images = [
  '/public/korean.png',
  '/public/korean.png',
  '/public/korean.png',
  '/public/korean.png',
  '/public/korean.png',
  '/public/korean.png',
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [direction, setDirection] = useState('right');

  const handleTabClick = (newTab) => {
    setDirection(newTab > activeTab ? 'right' : 'left');
    setActiveTab(newTab);
  };

  return (
    <div className="tabs-wrapper">
      <nav className="tabs-nav">
        {[1, 2, 3, 4, 5, 6].map((tab) => (
          <button key={tab} onClick={() => handleTabClick(tab)} className={`tab-button ${tab === activeTab ? 'active' : ''}`}>
            Tab {tab}
          </button>
        ))}
      </nav>
      <div className="tab-contents">
        {images.map((image, index) => (
          <div key={index} className={`tab-content ${index + 1 === activeTab ? 'active' : ''} ${direction}`}>
            <img src={image} alt={`Content ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
