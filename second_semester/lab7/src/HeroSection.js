import React from 'react';
import logo from './img/dota2icon.png'
const HeroSection = () => {
  return (
    <div className="hero-section">
      <img src={logo} alt="Dota 2" className="hero-image" width="100px"/>
      <h1>Добро пожаловать в Dota 2</h1>
      <p>Каждый день миллионы игроков по всему миру вступают в командную битву 5 на 5 в роли одного из более чем сотни героев.</p>
      <p>Dota — глубочайшая многопользовательская стратегия всех времён, в которой всегда найдётся место новой стратегии или тактике.</p>
      <p>Она совершенно бесплатна, и это не поменяется — начинайте защищать своего Древнего уже сейчас.</p>
    </div>
  );
};

export default HeroSection;
