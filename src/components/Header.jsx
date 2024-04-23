import React from 'react';
import '../styles/Header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="app-header">
      <div className="menu-log" style={{ flex: 1 }}>Menu</div>
      <h1 className="main-logo" style={{ flex: 2 }}>Logo</h1>
      <div className="search-logo" style={{ flex: 1 }}>Search</div>
    </header>
  );
};

export default Header;
