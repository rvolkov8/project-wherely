import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [levelsData, setLevelsData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);

  // Retrieve documents from the "assets" collection
  const assetsRef = collection(db, 'assets');

  useEffect(() => {
    const updateStorageWithURLs = async () => {
      try {
        const assetsSnapshot = await getDocs(assetsRef);

        assetsSnapshot.forEach(async (document) => {
          const data = document.data();
          const consoleName = data['console-name'];
          const consoleItems = data.items;

          // Updating console and items images urls
          const consoleImgPath = `${consoleName.toLowerCase()}/${consoleName.toLowerCase()}.jpg`;
          const consoleImgStorageRef = ref(storage, consoleImgPath);
          const consoleImageURL = await getDownloadURL(consoleImgStorageRef);
          const consoleDocRef = doc(db, 'assets', consoleName.toLowerCase());

          for (const itemMapName of Object.keys(consoleItems)) {
            const itemImgPath = `${consoleName.toLowerCase()}/items/${itemMapName}.png`;
            const itemImgRef = ref(storage, itemImgPath);
            const itemImgURL = await getDownloadURL(itemImgRef);
            const updatedDoc = {
              ...data,
              'console-image-url': consoleImageURL,
              items: {
                ...consoleItems,
                [`${itemMapName}`]: {
                  ...consoleItems[itemMapName],
                  url: itemImgURL,
                },
              },
            };
            await updateDoc(consoleDocRef, updatedDoc);
          }
        });
      } catch (error) {
        console.error('Firestore update error:', error);
      }
    };

    const fetchAssets = async () => {
      const assetsSnapshot = await getDocs(assetsRef);

      assetsSnapshot.forEach((doc) => {
        setLevelsData((prevState) => {
          return [
            ...prevState,
            {
              name: doc.data()['console-name'],
              url: doc.data()['console-image-url'],
              items: doc.data()['items'],
            },
          ];
        });
      });
    };

    const loadData = async () => {
      await updateStorageWithURLs();
      await fetchAssets();
    };

    loadData();

    return () => {
      setLevelsData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentLevel = window.localStorage.getItem('currentLevel');
    if (currentLevel) {
      setCurrentLevel(JSON.parse(currentLevel));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('currentLevel', JSON.stringify(currentLevel));
  }, [currentLevel]);

  return (
    <>
      <Header
        levelsData={levelsData}
        currentLevel={currentLevel}
        currentPath={currentPath}
      />
      <Main
        levelsData={levelsData}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />
      <Footer />
    </>
  );
}

export default App;
