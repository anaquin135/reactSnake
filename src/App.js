import React, { useState } from 'react';
import './App.css';
import Snake from './components/snake';
import Food from './components/food';

function setRandomCoord () {
  let min = 1; 
  let max = 98;

  var x = Math.floor((Math.random()*(min-max+1)+min)/2)*2;
  var y = Math.floor((Math.random()*(min-max+1)+min)/2)*2;

  if (x < 0) { x =  x * -1; }
  if (y < 0) { y =  y * -1; }

  return [x,y];
}



function App() {
  const [foodPos, setFPos] = useState(setRandomCoord());
  const [foodCount, setFC] = useState(0);

  const processMove = (e) => {
    if (e[0] == foodPos[0] && e[1] == foodPos[1]) {
      setFPos(setRandomCoord());
      setFC(foodCount + 1);
      return "grow";
    }
  }

  return (
    <div>
        <div>
          <center>
            <br />
            Count: {foodCount}
          </center>
        </div>

        <div className='game-area'>
          <Snake sendLoc={processMove} gameOver={()=>setFC(0)}/>
          <Food pos={foodPos}/>
        </div>
    </div>
  );
}

export default App;
