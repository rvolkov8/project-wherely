import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

import { db, storage } from '../../firebase';

import LevelCard from './LevelCard';

const Levels = ({ setCurrentLevel }) => {
  const [levelsData, setLevelsData] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const snapshot = collection(db, 'assets');
      const snapshotDocs = await getDocs(snapshot);

      snapshotDocs.forEach((doc) => {
        setLevelsData((prevState) => {
          return [
            ...prevState,
            {
              name: doc.data()['console-name'],
              url: null,
              items: doc.data()['items'],
            },
          ];
        });
      });

      const storageRef = ref(storage);
      const storageList = await listAll(storageRef);
      storageList.prefixes.map(async (levelFolder) => {
        const levelFolderRef = ref(levelFolder);
        const fileName = levelFolderRef._location.path_;
        const levelImgRef = ref(levelFolderRef, `${fileName}.jpg`);
        const levelImgURL = await getDownloadURL(levelImgRef);
        setLevelsData((prevState) => {
          const updatedState = [...prevState];
          // eslint-disable-next-line array-callback-return
          updatedState.map((level) => {
            if (level.name.toLowerCase() === fileName) {
              level.url = levelImgURL;
            }
          });
          return updatedState;
        });

        const levelItemsRef = ref(levelFolder, 'items');
        const levelItemsList = await listAll(levelItemsRef);
        // eslint-disable-next-line array-callback-return
        levelItemsList.items.map((item) => {
          const itemFileName = item._location.path_
            .split('/')
            .pop()
            .slice(0, -4);
          setLevelsData((prevState) => {
            const updatedState = [...prevState];
            updatedState.map(async (levelData) => {
              if (levelData.items[itemFileName]) {
                const itemImgURL = await getDownloadURL(item);
                levelData.items[itemFileName].url = itemImgURL;
              }
            });
            return updatedState;
          });
        });
      });
    };

    fetchAssets();

    return () => {
      setLevelsData([]);
    };
  }, []);

  const levelCards = levelsData.map((level) => {
    return (
      <LevelCard
        key={level.name}
        name={level.name}
        bgImageURL={level.url}
        items={level.items}
        setCurrentLevel={setCurrentLevel}
      />
    );
  });

  return (
    <div className="levels">
      <div className="leaderboard-section">
        <div className="leaderboard-section-text">
          Are you an expert? <span>View the Leaderboard</span>
        </div>
        <Link to="/leaderboard">
          <button className="leaderboard-section-button">Leaderboard</button>
        </Link>
      </div>
      <div className="levels-grid">{levelCards}</div>
      <div className="bg-gradient"></div>
    </div>
  );
};

export default Levels;
