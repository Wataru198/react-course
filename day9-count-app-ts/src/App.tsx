// React本体とuseStateフックをインポートする
import React, { useState } from "react";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // countという状態変数と、その値を更新するためのsetCount関数を定義する
  const [count, setCount] = useState<number>(0);

  // 「＋1する」ボタンがクリックされたときに実行される処理
  const handleClickPlus = (): void => {
    setCount((prev) => prev + 1);
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>Day9 カウントアップアプリ（TypeScript版）</h1>
      <p>現在のカウント: {count}</p>
      <button onClick={handleClickPlus}>＋1する</button>
    </div>
  );
}

export default App;
