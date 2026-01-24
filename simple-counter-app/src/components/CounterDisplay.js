// React本体をインポートする
import React from "react";

// 現在のカウント値を表示するCounterDisplayコンポーネントを定義する
// 親コンポーネントからcountという名前のpropsを受け取る
function CounterDisplay({ count }) {
  // JSXで表示内容を返す
  return (
    // 数字の表示全体を囲む要素
    <section className="counter-display">
      {/* ラベルテキストとして「現在のカウント」を表示する */}
      <p className="counter-label">現在のカウント</p>
      {/* 実際の数字を大きく表示する */}
      <p className="counter-value">{count}</p>
      {/* 状態に応じて簡単なコメントを表示する */}
      <p className="counter-message">
        {count === 0 && "スタートは 0 です。ボタンを押してみてください。"}
        {count > 0 && "プラス方向にカウント中です。"}
        {count < 0 && "マイナス方向にカウント中です。"}
      </p>
    </section>
  );
}

// 他のファイルからCounterDisplayコンポーネントを使えるようにexportする
export default CounterDisplay;
