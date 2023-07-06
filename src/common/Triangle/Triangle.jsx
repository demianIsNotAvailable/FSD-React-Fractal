import React, { useState, useEffect } from 'react';

const Triangle = ({ points }) => {
  const [circles, setCircles] = useState([]);
  const [isAddingCircles, setIsAddingCircles] = useState(false);
  const pointsStr = points.map(p => p.join(','));

  const getRandomPoint = () => {
    const [p1, p2, p3] = points;
    let s = Math.random();
    let t = Math.random();

    if(s + t > 1){
      s = 1 - s;
      t = 1 - t;
    }

    const x = s * p1[0] + t * p2[0] + (1 - s - t) * p3[0];
    const y = s * p1[1] + t * p2[1] + (1 - s - t) * p3[1];

    return [x, y];
  };

  const addCircle = (prevCircles) => {
    const newPoint = prevCircles.length > 0 ? getMidpoint(prevCircles[prevCircles.length - 1]) : getRandomPoint();
    return [...prevCircles, newPoint];
  };

  const getMidpoint = (lastPoint) => {
    const randomVertex = points[Math.floor(Math.random() * points.length)];
    const x = (lastPoint[0] + randomVertex[0]) / 2;
    const y = (lastPoint[1] + randomVertex[1]) / 2;
    return [x, y];
  };

  const addSingleCircle = () => {
    setCircles(prevCircles => addCircle(prevCircles));
  };

  const addCircles = (x) => {
    setCircles(prevCircles => {
      let newCircles = [...prevCircles];
      for(let i = 0; i < x; i++) {
        newCircles = addCircle(newCircles);
      }
      return newCircles;
    });
  };

  useEffect(() => {
    let intervalId;

    if (isAddingCircles) {
      intervalId = setInterval(() => {
        setCircles(prevCircles => addCircle(prevCircles));
      }, 1000 / 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAddingCircles]);

  return (
    <div>
      <button onClick={addSingleCircle}>Add Circle</button>
      <button onClick={() => addCircles(25)}>Add 25 Circles</button>
      <button onClick={() => addCircles(200)}>Add 200 Circles</button>
      <button onClick={() => addCircles(2000)}>Add 2000 Circles</button>
      <button onClick={() => setIsAddingCircles(!isAddingCircles)}>
        {isAddingCircles ? 'Stop Adding Circles' : 'Start Adding Circles'}
      </button>
      <svg width="900" height="900">
        <polygon points={pointsStr} style={{ fill: 'silver' }} />
        {circles.map((circle, i) => (
          <circle key={i} cx={circle[0]} cy={circle[1]} r="1" fill="red" />
        ))}
      </svg>
    </div>
  );
};

export default Triangle;
