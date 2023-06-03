import { useState, useEffect } from 'react';

const SecondsCounter = () => {
  const [second, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div className="header-timer">{second} s</div>;
};

export default SecondsCounter;
