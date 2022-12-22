import { useEffect, useRef, useState } from "react";

interface ball {
  x: number;
  y: number;
}
function App() {
  const container = useRef(null as unknown as HTMLDivElement);
  const [balls, setBalls] = useState<ball[]>([]);
  const [removed, setRemoved] = useState<ball[]>([]);

  const createBall = (ball: ball) => {
    var newList = [];
    newList.push(...balls, ball);
    setBalls(newList);
  };

  const removeBall = () => {
    if (balls.length === 0) {
      return;
    }
    var newList = [...balls];
    var removedBall = newList.pop() as unknown as ball;
    setBalls([...newList]);
    setRemoved([...removed, removedBall]);
  };
  const returnBall = () => {
    if (removed.length === 0) {
      return;
    }
    var newList = [...removed];
    var returnBall = newList.pop() as unknown as ball;
    setBalls([...balls, returnBall]);
    setRemoved([...newList]);
  };
  console.log(removed);
  return (
    <div className="App">
      <div className="buttons">
        <button onClick={removeBall}>Undo</button>
        <button onClick={returnBall}>Redo</button>
      </div>
      <div
        className="game-container"
        ref={container}
        onClick={(e) => {
          createBall({ x: e.pageX, y: e.pageY - 50 });
        }}
      >
        {balls.map((ball) => (
          <span style={{ top: `${ball.y}px`, left: `${ball.x}px` }}></span>
        ))}
      </div>
    </div>
  );
}

export default App;
