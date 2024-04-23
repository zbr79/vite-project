import React from 'react';
import '../styles/Header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="app-header">
      <div className="menu-log" style={{ flex: 1 }}>
        <img src="./icons/menu.svg" alt="Menu" /> {/* Update path as necessary */}
      </div>
      <h1 className="main-logo" style={{ flex: 2 }}>
        <img src="./icons/rensrecipe.png" alt="Logo" style={{ height: '100%' }} /> {/* Update path as necessary */}
      </h1>
      <div className="search-logo" style={{ flex: 1 }}>
        <img src="./icons/search.svg" alt="Search" /> {/* Update path as necessary */}
      </div>
    </header>
  );
};

export default Header;
