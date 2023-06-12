import { v4 as uuidv4 } from 'uuid';

import { useEffect } from 'react';
import DropdownItems from './DropdownItems';
import FoundItem from './foundItem';
import CongratulationsPopUp from './CongratulationsPopUp';

const Level = ({
  currentLevelImg,
  handleImageClick,
  currentLevelItems,
  guessShapeCoords,
  setGuessShapeCoords,
  handleLevelItemClick,
  setCurrentLevel,
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
}) => {
  useEffect(() => {
    return () => {
      setCurrentLevel(null);
      setGuessShapeCoords([]);
      setFoundItemsRelativeCoords([]);
      setFoundItemsCoords([]);
      setSeconds(0);
      setLevelIsCompleted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const foundItems = foundItemsRelativeCoords.map((coord) => {
    return <FoundItem key={uuidv4()} x={coord[0]} y={coord[1]} />;
  });

  return (
    <div className="level">
      <CongratulationsPopUp
        levelIsCompleted={levelIsCompleted}
        score={score}
        setScore={setWinnerName}
        winnerName={winnerName}
        setWinnerName={setWinnerName}
        handleWinnerNameChange={handleWinnerNameChange}
        updateLeaderBoard={updateLeaderBoard}
      />
      <img
        onClick={(e) => {
          handleImageClick(e);
        }}
        className="level-image"
        src={currentLevelImg}
        alt="Level"
      />
      {guessShapeCoords.length !== 0 && (
        <>
          <div
            className="guess-shape"
            style={{
              position: 'absolute',
              left: guessShapeCoords[0] - 50,
              top: guessShapeCoords[1] - 50,
            }}
          ></div>
          <DropdownItems
            guessShapeCoords={guessShapeCoords}
            currentLevelItems={currentLevelItems}
            handleLevelItemClick={handleLevelItemClick}
          />
        </>
      )}
      {foundItemsRelativeCoords !== 0 && foundItems}
      <div className={`found-alert ${showFoundAlert ? 'show' : ''}`}>
        Great! Let's find other characters.
      </div>
      <div className={`not-found-alert ${showNotFoundAlert ? 'show' : ''}`}>
        You missed. Keep looking.
      </div>
    </div>
  );
};

export default Level;
