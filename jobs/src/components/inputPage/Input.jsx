import React, { useState } from 'react';
import './Input.css'; // 스타일을 따로 관리할 경우

const Input = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleGenerateQuestions = () => {
    // 예상 질문 생성 로직을 추가
    console.log('파일:', file);
    console.log('URL:', url);
    console.log('포지션 요약:', summary);
  };

  return (
    <div className="input-container">
      <h2>자소서 파일첨부</h2>
      <p>500MB 이하의 pdf파일 업로드 가능</p>

      <div className="file-upload">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      <div className="url-input">
        <label>공고 URL 첨부</label>
        <input
          type="text"
          placeholder="채용공고 url을 입력하세요"
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <div className="summary-input">
        <label>포지션 요약</label>
        <textarea
          placeholder="공고 내용을 요약해서 보여주기
          ex) 소개, 회사위치, 요구하는 직무능력"
          value={summary}
          onChange={handleSummaryChange}
        />
      </div>

      <button className="generate-btn" onClick={handleGenerateQuestions}>
        예상 질문 생성하기
      </button>
    </div>
  );
};

export default Input;
