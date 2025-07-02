import React, { useState } from "react";

const subQuestions = [
  {
    q: "この目標を達成するために、どんな壁や問題点がありますか？",
    hint: "例：アプローチ先が少ない、時間が足りない、ノウハウ不足など"
  },
  {
    q: "その壁を乗り越えるために、どんな行動や工夫が必要ですか？",
    hint: "例：新しいリスト作成、時間の確保、勉強会参加など"
  },
  {
    q: "その行動や工夫の進捗を“数字”や“回数”で測るとしたら、どんな指標が考えられますか？",
    hint: "例：訪問件数、作成数、参加回数など"
  }
];

function KPIWizard({ onComplete }) {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (step < subQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // KPI案を生成して親に渡す
      const kpiSummary = answers.filter(a => a).join("、");
      onComplete(kpiSummary);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <b>{subQuestions[step].q}</b>
        <div style={{ color: '#888', fontSize: 13 }}>ヒント：{subQuestions[step].hint}</div>
      </div>
      <input
        value={answers[step]}
        onChange={handleChange}
        style={{ width: "90%", marginBottom: 16 }}
        placeholder="ここに入力してください"
      />
      <button onClick={handleNext} disabled={!answers[step]}>次へ</button>
    </div>
  );
}

export default KPIWizard;
