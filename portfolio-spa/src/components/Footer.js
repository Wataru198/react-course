// React本体をインポートする
import React from "react";

// ページ下部に表示する共通フッターコンポーネントを定義する
function Footer() {
  // JSXとしてフッターの内容を返す
  return (
    // フッター全体を包む要素
    <footer className="site-footer">
      {/* コピーライト表記などのテキストを表示する */}
      <p className="site-footer__text">
        &copy; {new Date().getFullYear()} Wata Portfolio. All rights reserved.
      </p>
    </footer>
  );
}

// 他のファイルからFooterコンポーネントを利用できるようにexportする
export default Footer;
