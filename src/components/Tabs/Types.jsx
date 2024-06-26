// TypesTabs.js
import React from 'react';
import '../../styles/Tabs/Types.css'; 

const TypesTabs = ({ tabData, activeTab, selectTab }) => {
  return (
    <div className="type-section">
      {tabData.map(({ typeName, catalogs }) => (
        <button key={typeName} onClick={() => selectTab(typeName, catalogs)}
          className={typeName === activeTab ? 'active' : ''}>
                <span className="type-name">{typeName}</span>
        </button>
      ))}
    </div>
  );
};

export default TypesTabs;
