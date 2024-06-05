import React from 'react';

const Card = ({ hero }) => {
  return (
    <div className="card">
      <h2>{hero['Имя персонажа']}</h2>
      <p>Атрибут: {hero.Атрибут}</p>
      <p>Количество здоровья: {hero['Количество здоровья']}</p>
      <p>Количество маны: {hero['Количество маны']}</p>
      <p>Атака: {hero.Атака}</p>
      <p>Броня: {hero.Броня}</p>
    </div>
  );
};

export default Card;
