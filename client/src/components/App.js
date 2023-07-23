import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [levelsData, setLevelsData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLevelData, setCurrentLevelData] = useState(null);
  const [currentLevelImg, setCurrentLevelImg] = useState(null);
  const [originalLevelImgSize, setOriginalLevelImgSize] = useState(null);
  const [currentLevelItems, setCurrentLevelItems] = useState(null);
  const [originalClickCoords, setOriginalClickCoords] = useState([]);
  const [guessShapeCoords, setGuessShapeCoords] = useState([]);
  const [foundItemsCoords, setFoundItemsCoords] = useState([]);
  const [foundItemsRelativeCoords, setFoundItemsRelativeCoords] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFoundAlert, setShowFoundAlert] = useState(false);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(null);

  // Responsible for fetching levels data
  useEffect(() => {
    const fetchLevelsData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_WHERELY_API}/levels`, {
          mode: 'cors',
        });
        const levels = await res.json();
        setLevelsData(levels);
      } catch (err) {
        console.error('Error occurred while fetching levels data: ' + err);
      }
    };
    fetchLevelsData();
  }, []);

  // Responsible for initializing the current level from local storage.
  useEffect(() => {
    const currentLevel = window.localStorage.getItem('currentLevel');
    if (currentLevel) {
      setCurrentLevel(JSON.parse(currentLevel));
    }
  }, []);

  // Responsible for updating the current level in local storage whenever it changes.
  useEffect(() => {
    window.localStorage.setItem('currentLevel', JSON.stringify(currentLevel));
  }, [currentLevel]);

  // Helper function to calculate relative coordinates
  const getRelativeCoords = (originalCoordsArr, originalImgSizeArr) => {
    const [originalX, originalY] = originalCoordsArr;
    const [originalWidth, originalHeight] = originalImgSizeArr;
    const offsetX = (originalX / originalWidth) * windowWidth;
    const offsetY = (originalY / originalHeight) * windowWidth;
    return [offsetX, offsetY];
  };

  // Responsible for updating the window width state whenever the browser window is resized.
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Responsible for finding and setting the current level data based on the currentLevel state and levelsData array.
  useEffect(() => {
    const newCurrentLevelData = levelsData.find(
      (level) => level['console-name'] === currentLevel
    );
    setCurrentLevelData(newCurrentLevelData);
  }, [levelsData, currentLevel]);

  // Responsible for updating various states based on the currentLevelData.
  useEffect(() => {
    if (currentLevelData) {
      const levelImgURI = `${process.env.REACT_APP_WHERELY_STATIC}/images/assets/${currentLevelData['console-name']}/${currentLevelData['console-filename']}`;
      setCurrentLevelImg(levelImgURI);
      setOriginalLevelImgSize(currentLevelData.size);
      setCurrentLevelItems(currentLevelData.items);
    }
  }, [currentLevelData]);

  // Responsible for updating the guess shape coordinates based on the currentLevelData and the window width.
  useEffect(() => {
    if (currentLevelData) {
      setGuessShapeCoords(
        getRelativeCoords(originalClickCoords, currentLevelData.size)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  // Responsible for updating the relative coordinates of found items based on the foundItemsCoords, originalLevelImgSize, and the window width.
  useEffect(() => {
    if (foundItemsCoords.length !== 0) {
      const updatedRelativeCoords = [];
      foundItemsCoords.forEach((coord) => {
        updatedRelativeCoords.push(
          getRelativeCoords(coord, originalLevelImgSize)
        );
      });
      setFoundItemsRelativeCoords(updatedRelativeCoords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundItemsCoords, windowWidth]);

  const handleImageClick = (event) => {
    // Update original click coords
    const { offsetX, offsetY } = event.nativeEvent;
    const { naturalWidth, naturalHeight } = event.target;

    const originalX = (offsetX / windowWidth) * naturalWidth;
    const originalY = (offsetY / windowWidth) * naturalHeight;

    setOriginalClickCoords([originalX, originalY]);

    // Update the shapes state with the new shape
    setGuessShapeCoords(
      getRelativeCoords([originalX, originalY], [naturalWidth, naturalHeight])
    );
  };

  const [levelIsCompleted, setLevelIsCompleted] = useState(false);
  const [winnerName, setWinnerName] = useState('');

  const [leaderboardsData, setLeaderboardsData] = useState([]);
  const [selectedLeaderboardLevel, setSelectedLeaderboardLevel] =
    useState('dreamcast');

  const fetchLeaderboardsData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_WHERELY_API}/leaderboards`,
        {
          mode: 'cors',
        }
      );
      const leaderboards = await res.json();
      setLeaderboardsData(leaderboards);
    } catch (err) {
      console.error('Error occurred while fetching leaderboards data: ' + err);
    }
  };

  useEffect(() => {
    fetchLeaderboardsData();
  }, []);

  const handleWinnerNameChange = (e) => {
    setWinnerName(e.target.value);
  };

  const updateLeaderBoard = async (winnerName, score) => {
    try {
      const reqURI = `${process.env.REACT_APP_WHERELY_API}/leaderboards/${currentLevel}`;
      const res = await fetch(reqURI, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          winnerName: winnerName.trim(),
          score,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update leaderboards data', res.status);
      }
    } catch (err) {
      console.error('Failed updating leaderboard data: ', err);
    }
    await fetchLeaderboardsData();
  };

  const handleLeaderBoardLevelSelection = (levelName) => {
    setSelectedLeaderboardLevel(levelName);
  };

  const handleLevelItemClick = (name) => {
    const levelMapName = name.toLowerCase().replace(/\s+/g, '-');
    const originalItemCoords = currentLevelItems[levelMapName].coords;
    const relativeItemCoords = getRelativeCoords(
      originalItemCoords,
      originalLevelImgSize
    );
    if (
      guessShapeCoords[0] <= relativeItemCoords[0] + 50 &&
      guessShapeCoords[0] >= relativeItemCoords[0] - 50 &&
      guessShapeCoords[1] <= relativeItemCoords[1] + 50 &&
      guessShapeCoords[1] >= relativeItemCoords[1] - 50
    ) {
      setCurrentLevelItems((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[levelMapName];
        // Check if the level is completed
        if (Object.keys(updatedState).length === 0) {
          setLevelIsCompleted(true);
        }
        return updatedState;
      });
      setFoundItemsCoords((prevState) => {
        return [...prevState, originalItemCoords];
      });
      setShowFoundAlert(true);
      setTimeout(() => {
        setShowFoundAlert(false);
      }, 2500);
    } else {
      setShowNotFoundAlert(true);
      setTimeout(() => {
        setShowNotFoundAlert(false);
      }, 2500);
    }
    setGuessShapeCoords([]);
  };

  useEffect(() => {
    if (levelIsCompleted) {
      setScore(seconds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIsCompleted]);

  return (
    <>
      <Header
        currentPath={currentPath}
        currentLevel={currentLevel}
        currentLevelData={currentLevelData}
        seconds={seconds}
        setSeconds={setSeconds}
        levelIsCompleted={levelIsCompleted}
      />
      <Main
        levelsData={levelsData}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
        handleImageClick={handleImageClick}
        guessShapeCoords={guessShapeCoords}
        setGuessShapeCoords={setGuessShapeCoords}
        currentLevelImg={currentLevelImg}
        currentLevelItems={currentLevelItems}
        handleLevelItemClick={handleLevelItemClick}
        foundItemsRelativeCoords={foundItemsRelativeCoords}
        setFoundItemsRelativeCoords={setFoundItemsRelativeCoords}
        setFoundItemsCoords={setFoundItemsCoords}
        showFoundAlert={showFoundAlert}
        showNotFoundAlert={showNotFoundAlert}
        setSeconds={setSeconds}
        levelIsCompleted={levelIsCompleted}
        setLevelIsCompleted={setLevelIsCompleted}
        score={score}
        winnerName={winnerName}
        setWinnerName={setWinnerName}
        handleWinnerNameChange={handleWinnerNameChange}
        updateLeaderBoard={updateLeaderBoard}
        leaderboardsData={leaderboardsData}
        selectedLeaderboardLevel={selectedLeaderboardLevel}
        handleLeaderBoardLevelSelection={handleLeaderBoardLevelSelection}
        setSelectedLeaderboardLevel={setSelectedLeaderboardLevel}
      />
      <Footer />
    </>
  );
}

export default App;
