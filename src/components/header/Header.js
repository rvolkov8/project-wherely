import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="header">
      <Link className="leaderboard-header-button" to="/leaderboard">
        Leaderboard
      </Link>
      <Logo />
      <Link className="about-header-button" to="/leaderboard">
        About
      </Link>
    </div>
  );
};

export default Header;
