// Reactというライブラリ本体をインポートする
import React from "react";
// useStateというReactのHook（状態を管理する仕組み）をインポートする
import { useState } from "react";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // 入力フォームの値を管理するための状態inputTextと、その値を更新するsetInputText関数を定義する
  // 初期値は空文字("")にすることで、最初は何も入力されていない状態にする
  const [inputText, setInputText] = useState("");

  // テキストボックスの内容が変わったときに実行される処理を定義する
  const handleChangeInput = (event) => {
    // event.target.value に、ユーザーが入力した文字列が入っているので、それを状態に反映する
    setInputText(event.target.value);
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
      <h1>Day7 フォームアプリ（最低要件）</h1>

      {/* フォーム部分を囲むコンテナ */}
      <div
        style={{
          border: "1px solid #ccc", // 枠線を付ける
          padding: "16px", // 内側の余白
          marginBottom: "24px", // 下側の余白
        }}
      >
        {/* フォームの見出し */}
        <h2>入力フォーム</h2>

        {/* テキストボックス。value に状態変数inputTextを渡し、onChangeで値の変化を検知する */}
        <input
          type="text" // テキスト入力用フィールド
          placeholder="ここに文字を入力してください" // 何も入力されていないときの薄い説明文
          value={inputText} // フォームの表示値としてinputText状態を使う（いわゆる「制御されたコンポーネント」）
          onChange={handleChangeInput} // 入力値が変化するたびにhandleChangeInputが呼ばれる
          style={{ width: "80%", padding: "8px" }} // 入力欄の横幅や余白を設定する
        />
      </div>

      {/* 表示部分を囲むコンテナ */}
      <div
        style={{
          border: "1px solid #ccc", // 枠線を付ける
          padding: "16px", // 内側の余白
        }}
      >
        {/* 表示エリアの見出し */}
        <h2>リアルタイム表示</h2>

        {/* 入力されたテキストをそのまま表示する。inputTextが空文字の場合は何も表示されない */}
        <p>現在の入力内容：{inputText}</p>
      </div>
    </div>
  );
}

// このAppコンポーネントを他のファイルから使えるようにするためのexport
export default App;
