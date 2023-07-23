import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CongratulationsPopUp = ({
  levelIsCompleted,
  score,
  winnerName,
  setWinnerName,
  handleWinnerNameChange,
  updateLeaderBoard,
  setSelectedLeaderboardLevel,
  currentLevel,
}) => {
  useEffect(() => {
    return () => {
      setWinnerName('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeaderboardButtonClick = async () => {
    await updateLeaderBoard(winnerName, score);
    setSelectedLeaderboardLevel(currentLevel);
  };

  return (
    <>
      <div className={`congratulations-bg ${levelIsCompleted && 'show'}`}></div>
      <div
        className={`congratulations-container ${levelIsCompleted && 'show'}`}
      >
        <div className="congratulations-text">Congratulations!</div>
        <div className="congratulations-score">
          You completed this level in <span>{score}s</span>
        </div>
        <label className="congratulations-label" htmlFor="name">
          Enter your name so others can see your score
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="e.g. John Brown"
          onChange={(e) => {
            handleWinnerNameChange(e);
          }}
          {...(winnerName ? { value: winnerName } : { value: '' })}
        />
        <div className={`congratulations-buttons ${!winnerName && 'disabled'}`}>
          <Link to="/" replace>
            <button
              className="congratulations-back-to-levels-button "
              type="button"
              onClick={handleLeaderboardButtonClick}
            >
              Go back to levels
            </button>
          </Link>
          <Link to="/leaderboard" replace>
            <button
              className="congratulations-leaderboard-button"
              type="button"
              onClick={handleLeaderboardButtonClick}
            >
              Leaderboard
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CongratulationsPopUp;
