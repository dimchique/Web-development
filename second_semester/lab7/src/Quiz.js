import React, { useState } from 'react';

const questions = [
    {
        question: "Какой главный атрибут у персонажа Anti-Mage?",
        options: ["Сила", "Ловкость", "Интеллект", "Универсальный"],
        answer: "Ловкость"
    },
    {
        question: "У какого героя есть способность 'Black Hole'?",
        options: ["Invoker", "Enigma", "Pudge", "Crystal Maiden"],
        answer: "Enigma"
    },
    {
        question: "Как называется существо, расположенное на реке?",
        options: ["Рошан", "Kunkka", "Sven", "Tidehunter"],
        answer: "Рошан"
    }
];

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption('');
        } else {
            setShowScore(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption('');
        setScore(0);
        setShowScore(false);
    };

    const getResultMessage = () => {
        const percentage = score;
        if (percentage == 3) {
            return "Мегахорош";
        } else if (percentage == 2) {
            return "Наш слоняра";
        } else if (percentage == 1) {
            return "Фифти фифти";
        } else {
            return "Непруха братела, иди учи мат часть";
        }
    };

    return (
        <div className="quiz">
            {showScore ? (
                <div className="score-section">
                    <h2>Ваш счёт: {score} / {questions.length}</h2>
                    <p>{getResultMessage()}</p>
                    <button onClick={handleRestart}>Попробовать ещё раз</button>
                </div>
            ) : (
                <div className="question-section">
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    <form onSubmit={handleSubmit}>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input type="radio" name="option" value={option} checked={selectedOption === option} onChange={handleOptionChange} />
                                    {option}
                                </label>
                            </div>
                        ))}
                        <button type="submit">Следующий вопрос</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Quiz;
