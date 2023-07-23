import { Link } from 'react-router-dom';

const Leaderboard = ({
  leaderboardsData,
  selectedLeaderboardLevel,
  handleLeaderBoardLevelSelection,
  setCurrentLevel,
}) => {
  const levelElements = leaderboardsData.map((leaderboard) => {
    return (
      <div
        onClick={() => {
          handleLeaderBoardLevelSelection(leaderboard['level-name']);
        }}
        key={leaderboard['level-name']}
        className={`leaderboard-levels-grid-item ${
          selectedLeaderboardLevel === leaderboard['level-name'] && 'selected'
        }`}
      >
        {leaderboard['level-name'].toUpperCase()}
      </div>
    );
  });

  const selectedLevelData =
    leaderboardsData &&
    leaderboardsData.find((leaderboard) => {
      return leaderboard['level-name'] === selectedLeaderboardLevel;
    });
  const selectedLevelScores = selectedLevelData && selectedLevelData.scores;

  const scoreElements =
    selectedLevelScores &&
    selectedLevelScores.map((score) => {
      return (
        <div key={score.name} className="score-element">
          <div className="score-name">{score.name}</div>
          <div className="score-time">{score.score}</div>
        </div>
      );
    });

  const levelPath = `/level/${selectedLeaderboardLevel}`;
  return (
    <div className="leaderboard">
      <div className="bg-gradient"></div>
      <div className="leaderboard-container">
        <div className="leaderboard-heading">Leaderboard</div>
        <Link to={levelPath}>
          <button
            onClick={() => {
              setCurrentLevel(selectedLeaderboardLevel);
            }}
            className="play-this-level-button"
            type="button"
          >
            Play this level
          </button>
        </Link>
        <div className="leaderboard-levels-grid">{levelElements}</div>
        <div className="leaderboard-columns">
          <div className="name-column">Name</div>
          <div className="time-column">Time (s)</div>
        </div>
        {scoreElements && (
          <div className="leaderboard-scores">{scoreElements}</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
