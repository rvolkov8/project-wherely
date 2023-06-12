import { useEffect } from 'react';

const SecondsCounter = ({ seconds, setSeconds, levelIsCompleted }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !levelIsCompleted ? (
    <div className="header-timer">{seconds} s</div>
  ) : null;
};

export default SecondsCounter;
