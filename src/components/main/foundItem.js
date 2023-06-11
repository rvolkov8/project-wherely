const FoundItem = ({ x, y }) => {
  return (
    <div
      className="found-item"
      style={{
        position: 'absolute',
        left: x - 50,
        top: y - 50,
      }}
    ></div>
  );
};

export default FoundItem;
