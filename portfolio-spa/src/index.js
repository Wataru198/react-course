// React本体をインポートする（JSXを書くために必要）
import React from "react";
// ReactDOMをインポートして、Reactコンポーネントを実際のDOMに描画する
import ReactDOM from "react-dom/client";
// ルーティング機能を提供するBrowserRouterコンポーネントをインポートする
import { BrowserRouter } from "react-router-dom";
// 全体の共通スタイルを読み込む
import "./index.css";
// アプリケーションのルートコンポーネントAppをインポートする
import App from "./App";

// index.html内のid="root"の要素を取得して、描画先のrootを作成する
const root = ReactDOM.createRoot(document.getElementById("root"));

// rootに対してReactコンポーネントを描画する
root.render(
  // 開発時に余計なチェックをしてくれるStrictModeでラップする
  <React.StrictMode>
    {/* ルーティング機能を有効にするため、AppをBrowserRouterでラップする */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
