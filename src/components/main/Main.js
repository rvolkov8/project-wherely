import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Levels from './Levels';
import Level from './Level';

const Main = () => {
  const [currentLevel, setCurrentLevel] = useState(null);
  const currentLevelPath = `/level/${currentLevel}`;
  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          element={<Levels setCurrentLevel={setCurrentLevel} />}
        />
        <Route
          path={currentLevelPath}
          element={<Level currentLevel={currentLevel} />}
        />
      </Routes>
    </div>
  );
};

export default Main;
