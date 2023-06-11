const DropdownItem = ({ url, name, handleLevelItemClick }) => {
  return (
    <div
      onClick={() => {
        handleLevelItemClick(name);
      }}
      className="dropdown-item"
    >
      <img src={url} alt="item" />
      <div>{name}</div>
    </div>
  );
};

export default DropdownItem;
