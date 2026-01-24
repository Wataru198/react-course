// React本体をインポートする
import React from "react";
// React RouterのLinkコンポーネントをインポートして、ページ遷移用リンクを作る
import { Link, NavLink } from "react-router-dom";

// ページ上部に表示する共通ヘッダーコンポーネントを定義する
function Header() {
  // JSXとしてヘッダーの内容を返す
  return (
    // ヘッダー全体を包む要素
    <header className="site-header">
      {/* 左側にサイトタイトルを表示する */}
      <div className="site-header__title">
        {/* クリックでトップページに戻るリンク */}
        <Link to="/" className="site-header__brand">
          Wata Portfolio
        </Link>
      </div>

      {/* 右側にナビゲーションメニューを表示する */}
      <nav className="site-nav">
        {/* NavLinkを使うと、現在のパスに応じてactiveクラスを付与できる */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/works"
          className={({ isActive }) =>
            isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
          }
        >
          Works
        </NavLink>
      </nav>
    </header>
  );
}

// 他のファイルからHeaderコンポーネントを利用できるようにexportする
export default Header;
