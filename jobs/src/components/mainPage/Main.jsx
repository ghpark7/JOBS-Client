import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/input'); // input 페이지로 이동
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo">
          면<strong>JOBS</strong>
        </div>
        <button className="info-button" onClick={handleButtonClick}>
          정보 입력하기
        </button>
      </header>
    </div>
  );
};

export default Main;