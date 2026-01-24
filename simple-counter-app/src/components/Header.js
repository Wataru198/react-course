// React本体をインポートする（JSXを使うために必要）
import React from "react";

// 画面上部のタイトルバーを表示するHeaderコンポーネントを定義する
function Header() {
  // JSXで表示内容を返す
  return (
    // ヘッダー全体を囲む要素（App.cssでデザインを当てる）
    <header className="app-header">
      {/* アプリ名を大きめの文字で表示する */}
      <h1 className="app-title">Simple Counter App</h1>
      {/* サブタイトルとして簡単な説明テキストを表示する */}
      <p className="app-subtitle">
        +1 / -1 / Reset のシンプルな React 製カウンター
      </p>
    </header>
  );
}

// 他のファイルからHeaderコンポーネントを使えるようにexportする
export default Header;
