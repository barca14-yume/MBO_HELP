import React from "react";
function ProgressBar({ current, total }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div>進捗：{current + 1} / {total} 項目</div>
      <div style={{ background: "#eee", borderRadius: 4, height: 10 }}>
        <div
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: "#4a90e2",
            height: 10,
            borderRadius: 4
          }}
        />
      </div>
    </div>
  );
}
export default ProgressBar;
