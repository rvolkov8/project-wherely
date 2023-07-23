import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemRow from './ItemRow';

const LevelCard = ({
  consoleName,
  consoleImgFilename,
  items,
  setCurrentLevel,
}) => {
  const [onHover, setOnHover] = useState(false);
  const levelPath = `/level/${consoleName}`;
  const consoleImgURI = `${process.env.REACT_APP_WHERELY_STATIC}/images/assets/${consoleName}/${consoleImgFilename}`;
  const formattedConsoleName =
    consoleName.length < 4
      ? consoleName.toUpperCase()
      : consoleName.charAt(0).toUpperCase() + consoleName.slice(1);

  const levelItems = Object.keys(items).map((key) => {
    const item = items[key];
    return (
      <ItemRow
        key={item.name}
        consoleName={consoleName}
        filename={item.filename}
        name={item.name}
      />
    );
  });

  const handleMouseOver = () => {
    setOnHover(true);
  };

  const handleMouseOut = () => {
    setOnHover(false);
  };

  return (
    <Link
      to={levelPath}
      onClick={() => {
        setCurrentLevel(consoleName);
      }}
      className="level-card"
    >
      <div className="border-hover"></div>
      <div
        style={{
          backgroundImage: `url(${consoleImgURI})`,
        }}
        className="level-card-content"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {onHover && (
          <>
            <div className="bg-hover"></div>
            <div className="level-card-name">{formattedConsoleName}</div>
            {levelItems}
          </>
        )}
        {!onHover && (
          <div className="level-card-name">{formattedConsoleName}</div>
        )}
      </div>
    </Link>
  );
};

export default LevelCard;
