const DropdownItem = ({
  currentLevel,
  imgFilename,
  name,
  handleLevelItemClick,
}) => {
  const imgURI = `${process.env.REACT_APP_WHERELY_STATIC}/images/assets/${currentLevel}/items/${imgFilename}`;
  return (
    <div
      onClick={() => {
        handleLevelItemClick(name);
      }}
      className="dropdown-item"
    >
      <img src={imgURI} alt="item" />
      <div>{name}</div>
    </div>
  );
};

export default DropdownItem;
