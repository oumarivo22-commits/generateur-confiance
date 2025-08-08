import React, { useState } from 'react';
import './App.css';

function App() {
  const [confidence, setConfidence] = useState(50);
  const [affirmation, setAffirmation] = useState('');

  const affirmations = [
    "Je suis capable de grandes choses",
    "Je mérite le succès et le bonheur",
    "Chaque jour, je deviens plus fort(e)",
    "J'ai confiance en mes capacités",
    "Je surmonte tous les défis avec courage",
    "Je suis unique et précieux(se)",
    "Mes rêves sont à ma portée",
    "Je rayonne de confiance naturellement"
  ];

  const generateAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  };

  const getConfidenceColor = () => {
    if (confidence < 30) return '#ff6b6b';
    if (confidence < 70) return '#ffd93d';
    return '#6bcf7f';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌟 Générateur de Confiance 🌟</h1>
        
        <div className="confidence-meter">
          <h2>Mon niveau de confiance aujourd'hui</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            style={{
              background: `linear-gradient(to right, ${getConfidenceColor()} 0%, ${getConfidenceColor()} ${confidence}%, #ddd ${confidence}%, #ddd 100%)`
            }}
          />
          <div className="confidence-display">
            <span style={{ color: getConfidenceColor(), fontSize: '2rem', fontWeight: 'bold' }}>
              {confidence}%
            </span>
          </div>
        </div>

        <div className="affirmation-section">
          <button onClick={generateAffirmation} className="generate-btn">
            Générer une affirmation positive
          </button>
          
          {affirmation && (
            <div className="affirmation-display">
              <p>"{affirmation}"</p>
            </div>
          )}
        </div>

        <div className="tips-section">
          <h3>💡 Conseils du jour</h3>
          <ul>
            <li>Respire profondément et souris</li>
            <li>Célèbre tes petites victoires</li>
            <li>Tu es plus fort(e) que tu ne le penses</li>
          </ul>
        </div>
      </header>
    </div>
  );
          }
