// React本体と、状態管理に使うuseStateフックをインポートする
import React, { useState } from "react";
// このコンポーネントで使うスタイル定義を読み込む
import "./App.css";
// タイトルバーを表示するHeaderコンポーネントをインポートする
import Header from "./components/Header";
// 現在のカウント値を表示するCounterDisplayコンポーネントをインポートする
import CounterDisplay from "./components/CounterDisplay";
// ボタン（+1 / -1 / リセット）をまとめたCounterControlsコンポーネントをインポートする
import CounterControls from "./components/CounterControls";
// 画面下部の説明テキストを表示するFooterコンポーネントをインポートする
import Footer from "./components/Footer";

// アプリ全体を表すルートコンポーネントAppを定義する
function App() {
  // countという名前の状態変数と、その値を更新するsetCount関数を定義する（初期値は0）
  const [count, setCount] = useState(0);

  // 「+1」ボタンが押されたときに呼ばれる関数を定義する
  const handleIncrement = () => {
    // setCountに現在の値+1を渡して、カウントを1増やす
    setCount((prevCount) => prevCount + 1);
  };

  // 「-1」ボタンが押されたときに呼ばれる関数を定義する
  const handleDecrement = () => {
    // setCountに現在の値-1を渡して、カウントを1減らす
    setCount((prevCount) => prevCount - 1);
  };

  // 「リセット」ボタンが押されたときに呼ばれる関数を定義する
  const handleReset = () => {
    // setCountに0を渡して、カウントを0に戻す
    setCount(0);
  };

  // 画面に表示する内容をJSXで返す
  return (
    // 画面全体を中央寄せにするためのラッパー要素
    <div className="app-root">
      {/* ヘッダー部分としてタイトルを表示する */}
      <Header />
      {/* カード風のボックスでカウンターUI全体を囲む */}
      <main className="app-main">
        {/* 現在のカウント値を子コンポーネントに渡して表示させる */}
        <CounterDisplay count={count} />
        {/* 各ボタンをまとめたコンポーネントに、イベントハンドラをpropsとして渡す */}
        <CounterControls
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onReset={handleReset}
        />
      </main>
      {/* 使い方や説明をフッターとして表示する */}
      <Footer />
    </div>
  );
}

// 他のファイルからAppコンポーネントを利用できるようにexportする
export default App;
