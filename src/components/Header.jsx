import React from 'react';
import '../styles/Header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="app-header">
      <div className="menu-log" style={{ flex: 1 }}>menu</div>
      <div className="main-logo" style={{ flex: 2 }}>logo</div>
      <div className="search-logo" style={{ flex: 1 }}>search</div>
    </header>
  );
};

export default Header;