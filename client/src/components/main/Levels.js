import { Link } from 'react-router-dom';

import LevelCard from './LevelCard';

const Levels = ({ levelsData, setCurrentLevel }) => {
  const levelCards = levelsData.map((level) => {
    return (
      <LevelCard
        key={level._id}
        consoleName={level['console-name']}
        consoleImgFilename={level['console-filename']}
        items={level.items}
        setCurrentLevel={setCurrentLevel}
      />
    );
  });

  return (
    <div className="levels">
      <div className="leaderboard-section">
        <div className="leaderboard-section-text">
          Are you an expert? <span>View the Leaderboard</span>
        </div>
        <Link to="/leaderboard">
          <button className="leaderboard-section-button">Leaderboard</button>
        </Link>
      </div>
      <div className="levels-grid">{levelCards}</div>
      <div className="bg-gradient"></div>
    </div>
  );
};

export default Levels;
