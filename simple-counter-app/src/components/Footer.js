// React本体をインポートする
import React from "react";

// 画面下部にアプリの説明や補足を表示するFooterコンポーネントを定義する
function Footer() {
  // JSXで表示内容を返す
  return (
    // フッター全体を囲む要素
    <footer className="app-footer">
      {/* 説明テキスト（使い方）を1行で表示する */}
      <p className="footer-text">
        ボタンのクリックイベントで useState を更新し、カウントを管理しています。
      </p>
      {/* 画面幅が狭いスマホでも読みやすいよう、短めの説明を入れておく */}
      <p className="footer-text">
        デザインはシンプルですが、モバイルでも崩れないレイアウトを意識しています。
      </p>
    </footer>
  );
}

// 他のファイルからFooterコンポーネントを使えるようにexportする
export default Footer;
