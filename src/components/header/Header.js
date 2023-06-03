import { Link } from 'react-router-dom';
import Logo from './Logo';
import SecondsCounter from '../main/SecondsCounter';

const Header = ({ currentPath }) => {
  const levelPathRegEx = /^\/level\/*/;
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
          <div className="header-level-items"></div>
          <SecondsCounter />
        </>
      )}
    </div>
  );
};

export default Header;
