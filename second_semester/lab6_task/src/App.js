import './App.css';
import React, { useState } from 'react';
import data from './data.js'
const ToggleText = ({ items }) => {
  const [visibleIndex, setVisibleIndex] = useState();

  const handleToggle = (index) => {
    setVisibleIndex(index === visibleIndex ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => {
        const title = Object.keys(item)[0];
        const text = item[title];
        return (
          <div key={index}>
            <div onClick={() => handleToggle(index)}>
              {title}
            </div>
            {visibleIndex === index && (
              <div>
                {text}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const App = () => (
  <div>
    <ToggleText items={data} />
  </div>
);

export default App;
