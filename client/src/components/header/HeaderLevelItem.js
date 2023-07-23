const HeaderLevelItem = ({ currentLevel, imgFilename, name }) => {
  const imgURI = `${process.env.REACT_APP_WHERELY_STATIC}/images/assets/${currentLevel}/items/${imgFilename}`;
  return (
    <div className="header-level-item">
      <img src={imgURI} alt="Item" />
      <div>{name}</div>
    </div>
  );
};

export default HeaderLevelItem;
