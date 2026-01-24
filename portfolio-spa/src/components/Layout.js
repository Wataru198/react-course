// React本体をインポートする
import React from "react";
// 画面上部の共通ヘッダーをインポートする
import Header from "./Header";
// 画面下部の共通フッターをインポートする
import Footer from "./Footer";

// childrenとして渡されたコンテンツをヘッダーとフッターで挟むレイアウトコンポーネントを定義する
function Layout({ children }) {
  // JSXとして画面構成を返す
  return (
    // レイアウト全体を包むルート要素
    <div className="layout-root">
      {/* すべてのページで共通のヘッダーを表示する */}
      <Header />
      {/* ページごとの内容を表示するmain領域 */}
      <main className="layout-main">{children}</main>
      {/* すべてのページで共通のフッターを表示する */}
      <Footer />
    </div>
  );
}

// 他のファイルからLayoutコンポーネントを利用できるようにexportする
export default Layout;
