import React, { useState } from 'react';
import Card from './Card';
import heroes from './data.js';

const HeroShowcase = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const handleNextHero = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroes.length);
  };

  const handlePrevHero = () => {
    setCurrentHeroIndex((prevIndex) => (prevIndex - 1 + heroes.length) % heroes.length);
  };

  return (
    <div className="hero-showcase">
      <h2>Список героев</h2>
      <Card hero={heroes[currentHeroIndex]} />
      <button onClick={handlePrevHero}>Предыдущий</button>
      <button onClick={handleNextHero}>Следующий</button>
    </div>
  );
};

export default HeroShowcase;
