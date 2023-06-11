import { v4 as uuidv4 } from 'uuid';

import { useEffect } from 'react';
import DropdownItems from './DropdownItems';
import FoundItem from './foundItem';

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
}) => {
  useEffect(() => {
    return () => {
      setCurrentLevel(null);
      setGuessShapeCoords([]);
      setFoundItemsRelativeCoords([]);
      setFoundItemsCoords([]);
    };
  }, []);

  const foundItems = foundItemsRelativeCoords.map((coord) => {
    return <FoundItem key={uuidv4()} x={coord[0]} y={coord[1]} />;
  });

  return (
    <div className="level">
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
