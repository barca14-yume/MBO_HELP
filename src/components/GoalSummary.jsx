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
      <h3>目標まとめ</h3>
      <textarea
        value={text}
        readOnly
        rows={8}
        style={{ width: "100%", fontFamily: "monospace" }}
      />
      <button
        onClick={handleDownload}
        disabled={!allFilled}
        style={{ marginTop: 8 }}
      >
        ダウンロード
      </button>
    </div>
  );
}

export default GoalSummary;
