import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

import './styles/index.css';
import './styles/header/Header.css';
import './styles/header/Logo.css';
import './styles/main/Main.css';
import './styles/main/About.css';
import './styles/main/CongratulationsPopUp.css';
import './styles/main/Leaderboard.css';
import './styles/main/Level.css';
import './styles/main/LevelCard.css';
import './styles/main/Levels.css';
import './styles/main/Main.css';
import './styles/main/NotFound.css';
import './styles/footer/Footer.css';
import './styles/footer/Github.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
