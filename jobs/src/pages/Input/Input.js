import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Input.css";

const Input = () => {
  const [jobPostingUrl, setJobPostingUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [customSummary, setCustomSummary] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`${file.name} 파일이 업로드되었습니다.`);
    }
  };

  const handleSummarize = () => {
    // 요약 API 호출 예시
    const generatedSummary = "이곳에 AI로 요약된 공고 내용이 제공됩니다.";
    setSummary(generatedSummary);
    setCustomSummary(generatedSummary); // 기본값은 요약된 내용
  };

  const handleProceedToInterview = () => {
    window.location.href = "/mock-interview";
  };

  return (
    <div className="input-page">
      {/* 상단 네비게이션 바 */}
      <AppBar position="sticky" className="navbar">
        <Toolbar className="navbar-toolbar">
          <Typography variant="h4" component="div" className="navbar-logo">
            <Link to="/" className="navbar-link">
              면JOBS
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="lg" className="input-container">
        <Typography variant="h5" className="section-title">
          자기소개서 업로드
        </Typography>
        <input
          type="file"
          className="file-upload"
          accept=".doc,.docx,.pdf"
          onChange={handleFileUpload}
        />

        <Typography variant="h5" className="section-title">
          채용공고 페이지 URL 입력
        </Typography>
        <Box className="url-input-container">
          <TextField
            variant="outlined"
            fullWidth
            placeholder="채용공고 페이지 URL을 입력하세요"
            value={jobPostingUrl}
            onChange={(e) => setJobPostingUrl(e.target.value)}
          />
          <Button
            variant="contained"
            className="summarize-button"
            onClick={handleSummarize}
          >
            공고 요약하기
          </Button>
        </Box>

        <Typography variant="h5" className="section-title">
          공고 요약 내용
        </Typography>
        <TextField
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={customSummary}
          onChange={(e) => setCustomSummary(e.target.value)}
          className="summary-textarea"
        />

        <Button
          variant="contained"
          className="proceed-button"
          onClick={handleProceedToInterview}
        >
          모의 면접 진행하기
        </Button>
      </Container>
    </div>
  );
};

export default Input;
