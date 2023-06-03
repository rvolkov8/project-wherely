import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemRow from './ItemRow';

const LevelCard = ({ name, bgImageURL, items }) => {
  const [onHover, setOnHover] = useState(false);

  const renderItems = () => {
    return Object.keys(items).map((key) => {
      const item = items[key];
      return <ItemRow key={item.name} url={item.url} name={item.name} />;
    });
  };

  const handleMouseOver = () => {
    setOnHover(true);
  };

  const handleMouseOut = () => {
    setOnHover(false);
  };

  return (
    <Link to={name.toLowerCase()} className="level-card">
      <div className="border-hover"></div>
      <div
        style={{ backgroundImage: `url(${bgImageURL})` }}
        className="level-card-content"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {onHover && (
          <>
            <div className="bg-hover"></div>
            <div className="level-card-name">{name}</div>
            {renderItems()}
          </>
        )}
        {!onHover && <div className="level-card-name">{name}</div>}
      </div>
    </Link>
  );
};

export default LevelCard;
