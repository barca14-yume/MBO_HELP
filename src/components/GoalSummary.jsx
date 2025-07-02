import React from "react";

function GoalSummary({ steps, answers }) {
  const allFilled = answers.every(ans => ans);
  const text = steps.map((step, i) =>
    `■${step.replace(/（.+$/, "")}：${answers[i] || ""}`
  ).join("\n");

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mbo.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 28, marginBottom: 12 }}>目標まとめ</h3>
      <textarea
        value={text}
        readOnly
        rows={8}
        style={{
          width: "100%",
          fontFamily: "monospace",
          fontSize: 20,
          border: '2px solid #4a90e2',
          borderRadius: 10,
          padding: '18px',
          background: '#f8fbff',
          marginBottom: 12,
          boxSizing: 'border-box',
          resize: 'vertical'
        }}
      />
      <button
        onClick={handleDownload}
        disabled={!allFilled}
        style={{ marginTop: 8, fontSize: 18, padding: '10px 28px', borderRadius: 6 }}
      >
        ダウンロード
      </button>
    </div>
  );
}

export default GoalSummary;
