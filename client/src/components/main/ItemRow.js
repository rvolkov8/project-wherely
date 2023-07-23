const ItemRow = ({ consoleName, filename, name }) => {
  const itemImgURI = `${process.env.REACT_APP_WHERELY_STATIC}/images/assets/${consoleName}/items/${filename}`;
  return (
    <div className="level-card-item-row">
      <img src={itemImgURI} alt="Item" />
      <div>{name}</div>
    </div>
  );
};

export default ItemRow;
