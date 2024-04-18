// TypesTabs.js
import React from 'react';
import '../../styles/Tabs/Types.css'; 

const TypesTabs = ({ tabData, activeTab, selectTab }) => {
  return (
    <div className="tab-buttons">
      {tabData.map(({ typeName, catalogs }) => (
        <button key={typeName} onClick={() => selectTab(typeName, catalogs)}
          className={typeName === activeTab ? 'active' : ''}>
          {typeName}
        </button>
      ))}
    </div>
  );
};

export default TypesTabs;
