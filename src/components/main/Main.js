import { Routes, Route } from 'react-router-dom';
import Levels from './Levels';
import Level from './Level';
import Leaderboard from './Leaderboard';
import About from './About';
import NotFound from './NotFound';

const Main = ({
  levelsData,
  currentLevel,
  setCurrentLevel,
  handleImageClick,
  guessShapeCoords,
  setGuessShapeCoords,
  currentLevelImg,
  currentLevelItems,
  handleLevelItemClick,
  foundItemsRelativeCoords,
  setFoundItemsRelativeCoords,
  setFoundItemsCoords,
  showFoundAlert,
  showNotFoundAlert,
  setSeconds,
  levelIsCompleted,
  setLevelIsCompleted,
  score,
  winnerName,
  setWinnerName,
  handleWinnerNameChange,
  updateLeaderBoard,
  leaderboardData,
  selectedLeaderboardLevel,
  handleLeaderBoardLevelSelection,
  setSelectedLeaderboardLevel,
}) => {
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
            <Level
              levelsData={levelsData}
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
              handleImageClick={handleImageClick}
              guessShapeCoords={guessShapeCoords}
              setGuessShapeCoords={setGuessShapeCoords}
              currentLevelImg={currentLevelImg}
              currentLevelItems={currentLevelItems}
              handleLevelItemClick={handleLevelItemClick}
              foundItemsRelativeCoords={foundItemsRelativeCoords}
              setFoundItemsRelativeCoords={setFoundItemsRelativeCoords}
              setFoundItemsCoords={setFoundItemsCoords}
              showFoundAlert={showFoundAlert}
              showNotFoundAlert={showNotFoundAlert}
              setSeconds={setSeconds}
              levelIsCompleted={levelIsCompleted}
              setLevelIsCompleted={setLevelIsCompleted}
              score={score}
              winnerName={winnerName}
              setWinnerName={setWinnerName}
              handleWinnerNameChange={handleWinnerNameChange}
              updateLeaderBoard={updateLeaderBoard}
              setSelectedLeaderboardLevel={setSelectedLeaderboardLevel}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              leaderboardData={leaderboardData}
              selectedLeaderboardLevel={selectedLeaderboardLevel}
              handleLeaderBoardLevelSelection={handleLeaderBoardLevelSelection}
              setCurrentLevel={setCurrentLevel}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Main;
