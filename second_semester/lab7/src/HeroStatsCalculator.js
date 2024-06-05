import React, { useState } from 'react';

const HeroStatsCalculator = ({ initialLevel = 1, initialStrength = 20, initialAgility = 20, initialIntelligence = 20 }) => {
  const [level, setLevel] = useState(initialLevel);
  const [strength, setStrength] = useState(initialStrength);
  const [agility, setAgility] = useState(initialAgility);
  const [intelligence, setIntelligence] = useState(initialIntelligence);

  const handleLevelChange = (event) => {
    setLevel(parseInt(event.target.value));
  };

  const handleStrengthChange = (event) => {
    setStrength(parseInt(event.target.value));
  };

  const handleAgilityChange = (event) => {
    setAgility(parseInt(event.target.value));
  };

  const handleIntelligenceChange = (event) => {
    setIntelligence(parseInt(event.target.value));
  };

  const calculateHealth = () => {
    return 200 + strength * 20 + (level - 1) * 20;
  };

  const calculateMana = () => {
    return 75 + intelligence * 12 + (level - 1) * 12;
  };

  const calculateArmor = () => {
    return agility * 0.16;
  };

  const calculateDamage = () => {
    return strength + agility + intelligence + level * 1.5;
  };

  return (
    <div className="hero-stats-calculator">
      <h2>Калькулятор атрибутов персонажей</h2>
      <h3>Введите значения основных атрибутов</h3>
      <form>
        <div>
          <label htmlFor="level">Уровень: </label>
          <input type="number" id="level" value={level} onChange={handleLevelChange} min="1" max="30" />
        </div>
        <div>
          <label htmlFor="strength">Сила: </label>
          <input type="number" id="strength" value={strength} onChange={handleStrengthChange} min="1" />
        </div>
        <div>
          <label htmlFor="agility">Ловкость: </label>
          <input type="number" id="agility" value={agility} onChange={handleAgilityChange} min="1" />
        </div>
        <div>
          <label htmlFor="intelligence">Интеллект: </label>
          <input type="number" id="intelligence" value={intelligence} onChange={handleIntelligenceChange} min="1" />
        </div>
      </form>
      <div className="results">
        <h3>Дополнительные атрибуты:</h3>
        <p>Здоровье: {calculateHealth()}</p>
        <p>Мана: {calculateMana()}</p>
        <p>Броня: {calculateArmor().toFixed(2)}</p>
        <p>Урон: {calculateDamage()}</p>
      </div>
    </div>
  );
};

export default HeroStatsCalculator;