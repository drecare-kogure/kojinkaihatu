import React, { useState } from 'react';
import './Saikoro.css';

function RandomNumberGenerator() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(6);

  const generateRandomNumber = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(newRandomNumber);
  };

  const handleMinInputChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxInputChange = (event) => {
    setMaxValue(event.target.value);
  };

  return (
    <div className="container"> {/* 中央揃えのためのコンテナ */}
      <div className="random-number-generator"> {/* スタイル適用の対象 */}
        <h2>{randomNumber && <p>{randomNumber}</p>}</h2>
        <div>
          <input type="number" value={minValue} onChange={handleMinInputChange} />
          ~
          <input type="number" value={maxValue} onChange={handleMaxInputChange} />
        </div>
        <button onClick={generateRandomNumber}>Generate Number</button>
      </div>
    </div>
  );
}

export default RandomNumberGenerator;
