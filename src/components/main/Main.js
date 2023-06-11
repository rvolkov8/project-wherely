import { Routes, Route } from 'react-router-dom';
import Levels from './Levels';
import Level from './Level';

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
              handleImageClick={handleImageClick}
              guessShapeCoords={guessShapeCoords}
              setGuessShapeCoords={setGuessShapeCoords}
              currentLevelImg={currentLevelImg}
              currentLevelItems={currentLevelItems}
              handleLevelItemClick={handleLevelItemClick}
              setCurrentLevel={setCurrentLevel}
              foundItemsRelativeCoords={foundItemsRelativeCoords}
              setFoundItemsRelativeCoords={setFoundItemsRelativeCoords}
              setFoundItemsCoords={setFoundItemsCoords}
              showFoundAlert={showFoundAlert}
              showNotFoundAlert={showNotFoundAlert}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
