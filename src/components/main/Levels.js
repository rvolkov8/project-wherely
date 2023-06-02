import { Link } from 'react-router-dom';

const Levels = () => {
  return (
    <div className="levels">
      <div className="leaderboard-section">
        <div className="leaderboard-section-text">
          Are you an expert? <span>View the Leaderboard</span>
        </div>
        <div className="leaderboard-section-button">Leaderboard</div>
      </div>
      <div className="levels-grid"></div>
      <div className="bg-gradient"></div>
    </div>
  );
};

export default Levels;
