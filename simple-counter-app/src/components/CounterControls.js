// React本体をインポートする
import React from "react";

// カウンターの操作ボタンをまとめたCounterControlsコンポーネントを定義する
// 親コンポーネントから3つのイベントハンドラをpropsとして受け取る
function CounterControls({ onIncrement, onDecrement, onReset }) {
  // JSXでボタン群を返す
  return (
    // ボタン全体を横並びに配置するためのラッパー要素
    <section className="counter-controls">
      {/* -1ボタン（クリック時にonDecrementを呼び出す） */}
      <button
        type="button"
        className="counter-button counter-button--decrement"
        onClick={onDecrement}
      >
        -1
      </button>
      {/* リセットボタン（クリック時にonResetを呼び出す） */}
      <button
        type="button"
        className="counter-button counter-button--reset"
        onClick={onReset}
      >
        Reset
      </button>
      {/* +1ボタン（クリック時にonIncrementを呼び出す） */}
      <button
        type="button"
        className="counter-button counter-button--increment"
        onClick={onIncrement}
      >
        +1
      </button>
    </section>
  );
}

// 他のファイルからCounterControlsコンポーネントを使えるようにexportする
export default CounterControls;
