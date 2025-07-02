import React, { useState, useEffect } from "react";
import ChatUI from "./components/ChatUI";
import ProgressBar from "./components/ProgressBar";
import GoalSummary from "./components/GoalSummary";
import "./App.css";
import "./themes.css";

const steps = [
  "MBO（定量的な成果目標）",
  "目的（なぜこの目標を立てるのか）",
  "KPI（進捗判断のための定量的指標）",
  "行動目標（KPI達成のために何をどのくらいやるか）",
  "行動計画（行動目標を実行する具体的ステップ）",
  "評価軸（達成度を段階的に評価する基準）"
];

function App() {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("mbo_answers");
    return saved ? JSON.parse(saved) : Array(6).fill("");
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("mbo_step");
    return savedStep ? parseInt(savedStep, 10) : -1;
  });
  const [theme, setTheme] = useState("light");
  const [style, setStyle] = useState("simple");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-style", style);
  }, [theme, style]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleAnswer = (text) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = text;
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setAnswers(Array(6).fill(""));
    setCurrentStep(-1);
    localStorage.removeItem("mbo_answers");
    localStorage.removeItem("mbo_step");
  };

  const handleSave = () => {
    localStorage.setItem("mbo_answers", JSON.stringify(answers));
    localStorage.setItem("mbo_step", currentStep.toString());
    alert("途中保存しました！");
  };

  const handleResume = () => {
    const saved = localStorage.getItem("mbo_answers");
    const savedStep = localStorage.getItem("mbo_step");
    if (saved && savedStep) {
      setAnswers(JSON.parse(saved));
      setCurrentStep(parseInt(savedStep, 10));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={toggleTheme} style={{ fontSize: 15, padding: '6px 18px', borderRadius: 20, background: theme === 'dark' ? '#39495c' : '#e3edfa', color: theme === 'dark' ? '#fff' : '#2467b3', border: 'none', marginRight: 8 }}>
            {theme === 'dark' ? '☀ ライトモード' : '🌙 ダークモード'}
          </button>
          <select value={style} onChange={handleStyleChange} style={{ fontSize: 15, padding: '6px 18px', borderRadius: 20, background: '#fff', color: '#2467b3', border: '1px solid #e0e7ef', marginLeft: 8 }}>
            <option value="simple">シンプル</option>
            <option value="pop">ポップ</option>
            <option value="cool">クール</option>
          </select>
        </div>
        {currentStep === -1 ? (
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <h2>壁打ち型MBO目標アシスタント</h2>
            <p>一問一答形式で、あなたの目標作成をサポートします。</p>
            <button onClick={() => setCurrentStep(0)} style={{ fontSize: 18, padding: "12px 32px", marginRight: 12 }}>はじめる</button>
            <button onClick={handleResume} style={{ fontSize: 16, padding: "10px 24px", marginRight: 12 }}>途中から再開</button>
            <div style={{ marginTop: 24, color: '#888' }}>
              <small>※途中保存した内容がある場合は「途中から再開」できます</small>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <button onClick={handleReset} style={{ marginRight: 8 }}>初期画面に戻る</button>
              <button onClick={handleBack} disabled={currentStep === 0} style={{ marginRight: 8 }}>一問前に戻る</button>
              <button onClick={handleSave}>途中保存</button>
            </div>
            <ChatUI
              steps={steps}
              currentStep={currentStep}
              answers={answers}
              onAnswer={handleAnswer}
            />
          </>
        )}
      </div>
      <div className="right-panel">
        {currentStep >= 0 && <ProgressBar current={currentStep} total={steps.length} />}
        <GoalSummary steps={steps} answers={answers} />
      </div>
    </div>
  );
}

export default App;
