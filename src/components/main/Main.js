import { Routes, Route } from 'react-router-dom';
import Levels from './Levels';
import Level from './Level';

const Main = ({ levelsData, currentLevel, setCurrentLevel }) => {
  const currentLevelPath = `/level/${currentLevel}`;
  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          element={
            <Levels levelsData={levelsData} setCurrentLevel={setCurrentLevel} />
          }
        />
        <Route
          path={currentLevelPath}
          element={
            <Level levelsData={levelsData} currentLevel={currentLevel} />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
