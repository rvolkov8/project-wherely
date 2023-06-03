import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <Header currentPath={currentPath} />
      <Main />
      <Footer />
    </>
  );
}

export default App;
