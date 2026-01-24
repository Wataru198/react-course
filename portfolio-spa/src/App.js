// React本体をインポートする
import React from "react";
// ルーティングに必要なRoutesとRouteコンポーネントをインポートする
import { Routes, Route } from "react-router-dom";
// レイアウト（共通ヘッダー・フッター）コンポーネントをインポートする
import Layout from "./components/Layout";
// 各ページコンポーネントをインポートする
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
// アプリ全体のスタイルを読み込む
import "./App.css";

// アプリケーション全体を表すAppコンポーネントを定義する
function App() {
  // JSXで画面構成を返す
  return (
    // 共通のヘッダー・フッターを持つレイアウトで全体を包む
    <Layout>
      {/* ここにURLパスに応じて切り替えるルート定義を書く */}
      <Routes>
        {/* トップページ（/）にHomeコンポーネントを表示する */}
        <Route path="/" element={<Home />} />
        {/* /about にアクセスしたときにAboutコンポーネントを表示する */}
        <Route path="/about" element={<About />} />
        {/* /works にアクセスしたときにWorksコンポーネントを表示する */}
        <Route path="/works" element={<Works />} />
      </Routes>
    </Layout>
  );
}

// 他のファイルからAppコンポーネントをインポートできるようにexportする
export default App;
