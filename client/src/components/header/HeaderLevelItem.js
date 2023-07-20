const HeaderLevelItem = ({ imgURL, name }) => {
  return (
    <div className="header-level-item">
      <img src={imgURL} alt="Item" />
      <div>{name}</div>
    </div>
  );
};

export default HeaderLevelItem;
