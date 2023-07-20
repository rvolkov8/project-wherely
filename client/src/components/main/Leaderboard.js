import { Link } from 'react-router-dom';

const Leaderboard = ({
  leaderboardData,
  selectedLeaderboardLevel,
  handleLeaderBoardLevelSelection,
  setCurrentLevel,
}) => {
  const consoleNames = Object.keys(leaderboardData).map((name) =>
    name.toUpperCase()
  );
  const levelElements = consoleNames.map((consoleName) => {
    return (
      <div
        onClick={() => {
          handleLeaderBoardLevelSelection(consoleName.toLowerCase());
        }}
        key={consoleName}
        className={`leaderboard-levels-grid-item ${
          selectedLeaderboardLevel === consoleName.toLowerCase() && 'selected'
        }`}
      >
        {consoleName}
      </div>
    );
  });

  const selectedLevelScores =
    leaderboardData[selectedLeaderboardLevel] &&
    leaderboardData[selectedLeaderboardLevel];
  const scoreElements =
    selectedLevelScores &&
    Object.keys(selectedLevelScores)
      .sort((a, b) => selectedLevelScores[a] - selectedLevelScores[b])
      .map((name) => {
        return (
          <div key={name} className="score-element">
            <div className="score-name">{name}</div>
            <div className="score-time">{selectedLevelScores[name]}</div>
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
