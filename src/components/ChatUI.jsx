import React, { useState } from "react";
import { getAIResponse } from "../utils/openai";
import KPIWizard from "./KPIWizard";

const templates = [
  "例：新規顧客を20件獲得する",
  "例：既存顧客の離反が進んでいるため、新規流入で顧客数を確保したい",
  "例：見込み客リスト10件、訪問件数100件、商談化率30％",
  "例：月内に新規訪問100件",
  "例：①見込み客リスト作成 ②訪問時間確保 ③スケジューリング ④訪問・記録",
  "例：1＝未訪問、2＝50件、3＝100件、4＝120件以上"
];

function ChatUI({ steps, currentStep, answers, onAnswer }) {
  // KPIWizard用のフラグ
  const isKPI = currentStep === 2;
  const [input, setInput] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    onAnswer(input);
    setInput("");
    // AIフィードバック生成例（OpenAI API利用）
    const aiRes = await getAIResponse(
      steps[currentStep],
      input,
      templates[currentStep]
    );
    setAiMessage(aiRes);
  };

  return (
    <div>
      <div>
        {isKPI ? (
          <KPIWizard onComplete={kpi => onAnswer(kpi)} />
        ) : (
          <>
            <div>
              <b>AI：</b>
              {steps[currentStep]}<br />
              <span style={{ color: "#888" }}>ヒント：{templates[currentStep]}</span>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ width: "96%", marginTop: 16, fontSize: 20, padding: '14px', borderRadius: 6, border: '1px solid #aaa' }}
                placeholder="ここに入力してください"
              />
              <button type="submit" style={{ fontSize: 18, padding: '10px 28px', marginLeft: 12, borderRadius: 6 }}>送信</button>
            </form>
            {aiMessage && (
              <div style={{ marginTop: 16, color: "#4a90e2" }}>
                <b>AIフィードバック：</b>{aiMessage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ChatUI;
