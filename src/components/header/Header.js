import { Link } from 'react-router-dom';
import Logo from './Logo';
import SecondsCounter from './SecondsCounter';
import HeaderLevelItem from './HeaderLevelItem';

const Header = ({
  currentPath,
  currentLevelItems,
  seconds,
  setSeconds,
  levelIsCompleted,
}) => {
  const levelPathRegEx = /^\/level\/*/;

  let levelItemsElements = [];
  if (currentLevelItems) {
    const levelItemsKeys = Object.keys(currentLevelItems);
    levelItemsElements = levelItemsKeys.map((key) => {
      const item = currentLevelItems[key];
      return (
        <HeaderLevelItem key={item.name} imgURL={item.url} name={item.name} />
      );
    });
  }

  return (
    <div className="header">
      {currentPath === '/' && (
        <>
          <Link className="leaderboard-header-button" to="/leaderboard">
            Leaderboard
          </Link>
          <Logo />
          <Link className="about-header-button" to="/leaderboard">
            About
          </Link>
        </>
      )}
      {levelPathRegEx.test(currentPath) && (
        <>
          <Link className="header-back-to-level-button" to="/">
            Back to levels
          </Link>
          <div className="header-level-items">{levelItemsElements}</div>
          <SecondsCounter
            seconds={seconds}
            setSeconds={setSeconds}
            levelIsCompleted={levelIsCompleted}
          />
        </>
      )}
    </div>
  );
};

export default Header;
