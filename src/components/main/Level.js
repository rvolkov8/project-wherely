import { useEffect, useState } from 'react';

import { storage } from '../../firebase';

import { ref, getDownloadURL } from 'firebase/storage';

const Level = ({ currentLevel }) => {
  const [levelData, setLevelData] = useState({
    levelImgURL: null,
  });

  useEffect(() => {
    const fetchAssets = async () => {
      const levelImageRef = ref(storage, `${currentLevel}/${currentLevel}.jpg`);
      const levelImageURL = await getDownloadURL(levelImageRef);
      setLevelData((prevState) => {
        return {
          ...prevState,
          levelImageURL: levelImageURL,
        };
      });
    };

    fetchAssets();

    return () => {
      setLevelData({});
    };
  }, []);

  return (
    <div className="level">
      <img className="level-image" src={levelData.levelImageURL} alt="Level" />
    </div>
  );
};

export default Level;
