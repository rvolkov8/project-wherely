const ItemRow = ({ url, name }) => {
  return (
    <div className="level-card-item-row">
      <img loading="lazy" src={url} alt="Item" />
      <div>{name}</div>
    </div>
  );
};

export default ItemRow;
