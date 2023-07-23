import DropdownItem from './DropdownItem';

const DropdownItems = ({
  guessShapeCoords,
  currentLevel,
  currentLevelItems,
  handleLevelItemClick,
}) => {
  const itemsKeys = Object.keys(currentLevelItems);
  const items = itemsKeys.map((key) => {
    const item = currentLevelItems[key];
    return (
      <DropdownItem
        key={item.name}
        currentLevel={currentLevel}
        handleLevelItemClick={handleLevelItemClick}
        imgFilename={item.filename}
        name={item.name}
      />
    );
  });
  return (
    <div
      className="dropdown-items"
      style={{
        position: 'absolute',
        left: guessShapeCoords[0],
        top: guessShapeCoords[1],
      }}
    >
      {items}
    </div>
  );
};

export default DropdownItems;
