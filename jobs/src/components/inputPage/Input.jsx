import React, { useState, useEffect } from 'react';
import './Input.css'; // 스타일을 따로 관리할 경우
import axios from 'axios';
import Cookies from 'js-cookie';

const MB = 1024 * 1024;
const MAX_FSIZE = 50 * MB;

const Input = () => {
  const [file, setFile] = useState(null);
  const [recruitUrl, setRecruitUrl] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [recentDate, setRecentDate] = useState('');
  const [token, setToken] = useState(Cookies.get('token') || null);

  const updateToken = () => {
    const newToken = Cookies.get('token');
    if (newToken && !token) {
      setToken(newToken);
    }
  };
  useEffect(updateToken, [token]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return alert('알려지지 않은 오류: 파일 없음.');
    if (f.size > MAX_FSIZE) return alert('파일 용량 제한을 초과하였습니다.');
    setFile(f);
  };

  const handleRecruitUrlChange = (e) => {
    setRecruitUrl(e.target.value);
  };

  const handleSummaryTextChange = (e) => {
    setSummaryText(e.target.value);
  };

  const handleGenerateQuestions = async () => {
    if (!file) return console.warn('400 (File Empty)');

    console.log('자소서 첨부:', file);
    console.log('채용공고 링크:', recruitUrl);
    console.log('포지션 요약:', summaryText);
    console.log('마지막 수정:', await updateDate());

    // 예상 질문 생성 로직을 추가
  };

  const updateDate = async () => {
    const nowDate = new Date(Date.now()).toUTCString();
    setRecentDate(nowDate);
    return Promise.resolve(nowDate);
  };

  const reloadForm = async () => {
    try {
      const res = await axios.get('http://localhost:8080/input/', {
        withCredentials: true,
      });
      const result = res.data;
      if (result) {
        console.log(result);
        // setFile(result.fileDirname);
        setRecruitUrl(result.recruitUrl);
        setSummaryText(result.summaryText);
        setRecentDate(result.recentDate);
      }
    } catch (e) {
      // alert(e)
    }
  };
  useEffect(() => {
    reloadForm();
  }, []);

  const uploadFile = async () => {
    if (!file) return;

    const ep = 'http://localhost:8080/input/uploadfile/';

    const body = new FormData();
    body.set('file', file);

    const tail = { recruitUrl, summaryText, recentDate };
    for (let [k, v] of Object.entries(tail)) {
      body.set(k, v);
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    };

    let result = null;
    try {
      const res = await axios.post(ep, body, config);
      result = res.data;
    } catch (e) {
      alert(e);
      result = e;
    }
    console.log('업로드 결과:', result);
  };
  useEffect(() => {
    uploadFile();
  }, [recentDate]);

  return (
    <div className="input-container">
      <h2>정보 입력하기</h2>
      <p>1. 자소서 첨부 (.pdf / 50MB 이하)</p>

      <div className="file-upload">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      <div className="recruit-url-input">
        <label>2. 채용공고 링크</label>
        <input
          type="text"
          placeholder="https://www.jobkorea.co.kr/Recruit/GI_Read/...로 시작하는 URL"
          value={recruitUrl}
          onChange={handleRecruitUrlChange}
        />
      </div>

      <div className="summary-text-input">
        <label>3. 포지션 요약</label>
        <textarea
          placeholder="공고 내용을 요약해서 보여주기
          ex) 소개, 회사위치, 요구하는 직무능력"
          value={summaryText}
          onChange={handleSummaryTextChange}
        />
      </div>

      <button className="generate-btn" onClick={handleGenerateQuestions}>
        예상 질문 생성하기
      </button>

      <div className="recent-date">
        <small>{recentDate == '' ? '' : `마지막 수정: ${recentDate}`}</small>
      </div>
    </div>
  );
};

export default Input;
