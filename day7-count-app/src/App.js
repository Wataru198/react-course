// Reactというライブラリ本体をインポートする
import React from "react";
// useStateというReactのHook（状態を管理する仕組み）をインポートする
import { useState } from "react";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // countという状態変数と、その値を更新するためのsetCount関数を定義する
  // useState(0) と書くことで、count の初期値を 0 にする
  const [count, setCount] = useState(0);

  // 「＋1する」ボタンがクリックされたときに実行される処理を定義する
  const handleClickPlus = () => {
    // setCount に新しい値（現在のcountに+1した値）を渡して状態を更新する
    setCount(count + 1);
  };

  // 「−1する」ボタンがクリックされたときに実行される処理を定義する
  const handleClickMinus = () => {
    // setCount に新しい値（現在のcountに-1した値）を渡して状態を更新する
    setCount(count - 1);
  };

  // 画面に表示する JSX（HTMLのような見た目の記述）を return で返す
  return (
    // アプリ全体を囲む div 要素
    <div
      style={{
        // 画面の余白（パディング）を40pxに設定する
        padding: "40px",
        // 中身を中央寄せにする
        textAlign: "center",
      }}
    >
      {/* アプリのタイトルを表示する h1 要素 */}
      <h1>Day7 カウントアップアプリ（＋1／−1対応）</h1>

      {/* 現在のカウントの値を表示する p 要素 */}
      <p>現在のカウント: {count}</p>

      {/* ボタンを横に並べるためのコンテナ div */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        {/* 「−1する」ボタン。クリックされたときに handleClickMinus 関数を実行する */}
        <button onClick={handleClickMinus}>−1する</button>

        {/* 「＋1する」ボタン。クリックされたときに handleClickPlus 関数を実行する */}
        <button onClick={handleClickPlus}>＋1する</button>
      </div>
    </div>
  );
}

// このAppコンポーネントを他のファイルから使えるようにするためのexport
export default App;
