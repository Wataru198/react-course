// Reactの機能を使うためにReactとuseStateとuseEffectをインポートする
import React, { useState, useEffect } from "react";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // countという状態（数字）と、その値を更新するsetCount関数を用意する
  // useState(0) で、最初の値を0にする
  const [count, setCount] = useState(0);

  // コンポーネントが最初に表示されたときに1回だけ実行される処理
  useEffect(() => {
    // localStorageから前回保存したカウント値を取り出す
    const savedCount = localStorage.getItem("day1-count");

    // 保存されている値があれば、それを数値に変換して状態に反映する
    if (savedCount !== null) {
      setCount(Number(savedCount));
    }
  }, []); // 第2引数を空配列にすると、初回表示時の1回だけ実行される

  // countの値が変わるたびに実行される処理
  useEffect(() => {
    // 現在のcountの値を文字列に変換してlocalStorageに保存する
    localStorage.setItem("day1-count", String(count));
  }, [count]); // 第2引数の配列にcountを渡すと、countが変わるたびに実行される

  // ＋ボタンがクリックされたときに実行される処理を定義する
  const handleIncrement = () => {
    // setCountを使ってcountの値を1増やす
    setCount(count + 1);
  };

  // −ボタンがクリックされたときに実行される処理を定義する
  const handleDecrement = () => {
    // setCountを使ってcountの値を1減らす
    setCount(count - 1);
  };

  // 画面に表示する内容を返す
  return (
    // アプリ全体を囲むdivタグ
    <div>
      {/* アプリのタイトルを表示する */}
      <h1>Day1 カウントアプリ</h1>

      {/* 現在のカウントの値を表示する */}
      <p>現在のカウント値: {count}</p>

      {/* クリックするとhandleIncrementが実行されるボタン */}
      <button onClick={handleIncrement}>＋1する</button>

      {/* クリックするとhandleDecrementが実行されるボタン */}
      <button onClick={handleDecrement}>−1する</button>
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを使えるようにする
export default App;
