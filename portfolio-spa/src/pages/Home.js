// React本体をインポートする
import React from "react";
// React RouterのLinkコンポーネントをインポートしてボタン風リンクを作る
import { Link } from "react-router-dom";

// トップページ（/）を表すHomeコンポーネントを定義する
function Home() {
  // JSXとしてトップページの内容を返す
  return (
    // コンテンツ全体を包む要素
    <section className="page page--home">
      {/* ページのメイン見出し */}
      <h2 className="page-title">ようこそ、Wata のポートフォリオへ</h2>
      {/* サブテキストとして簡単な紹介文を表示する */}
      <p className="page-text">
        このサイトでは、Reactを使って作成した学習用の制作物や自己紹介をまとめています。
      </p>
      {/* 主要なリンクをボタン風にまとめたエリア */}
      <div className="home-actions">
        {/* Aboutページへのリンクボタン */}
        <Link to="/about" className="button button--primary">
          自己紹介を見る
        </Link>
        {/* Worksページへのリンクボタン */}
        <Link to="/works" className="button button--secondary">
          制作物一覧を見る
        </Link>
      </div>
    </section>
  );
}

// 他のファイルからHomeコンポーネントを利用できるようにexportする
export default Home;
