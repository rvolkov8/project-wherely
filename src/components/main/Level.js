const Level = ({ levelsData, currentLevel }) => {
  const levelImgURL = levelsData.find(
    (levelData) => levelData.name.toLowerCase() === currentLevel
  )?.url;

  return (
    <div className="level">
      <img className="level-image" src={levelImgURL} alt="Level" />
    </div>
  );
};

export default Level;
