import { Routes, Route } from 'react-router-dom';
import Levels from './Levels';

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Levels />} />
      </Routes>
    </div>
  );
};

export default Main;
