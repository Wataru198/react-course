// Reactの機能を使うためにReactをインポートする
import React, { useState } from "react";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // countという状態（数字）と、その値を更新するsetCount関数を用意する
  // useState(0) で、最初の値を0にする
  const [count, setCount] = useState(0);

  // ボタンがクリックされたときに実行される処理を定義する
  const handleClick = () => {
    // setCountを使ってcountの値を1増やす
    setCount(count + 1);
  };

  // 画面に表示する内容を返す
  return (
    // アプリ全体を囲むdivタグ
    <div>
      {/* アプリのタイトルを表示する */}
      <h1>Day1 カウントアプリ</h1>

      {/* 現在のカウントの値を表示する */}
      <p>現在のカウント値: {count}</p>

      {/* クリックするとhandleClickが実行されるボタン */}
      <button onClick={handleClick}>＋1する</button>
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを使えるようにする
export default App;
