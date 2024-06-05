import React from 'react';

const FeatureSection = () => {
  const features = [
    { title: "Красивые сражения", description: "Изучите поле боя на многих уникальных героях." },
    { title: "Стратегический геймплей", description: "Планируйте ваши стратегии и переигрывайте ваших оппонентов." },
    { title: "Регулярные обновления", description: "Наслаждайтесь частыми обновления с большим количеством нововведений." },
  ];

  return (
    <div className="feature-section">
      <h2>Описание игры</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
