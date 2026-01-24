// React本体をインポートする
import React from "react";

// 自己紹介ページ（/about）を表すAboutコンポーネントを定義する
function About() {
  // JSXとしてページ内容を返す
  return (
    // コンテンツ全体を包む要素
    <section className="page page--about">
      {/* ページのメイン見出し */}
      <h2 className="page-title">About Me</h2>
      {/* 簡単な自己紹介文を表示する */}
      <p className="page-text">
        現在、ReactやTypeScript、Next.jsなどのフロントエンド技術を学習しています。
        授業や自習を通じて、小さなアプリを積み上げながらポートフォリオを充実させていく予定です。
      </p>
      {/* 学習中の技術や興味のある分野を箇条書きで表示する */}
      <div className="about-section">
        <h3 className="about-section__title">学習中の技術</h3>
        <ul className="about-list">
          <li>HTML / CSS / JavaScript</li>
          <li>React / React Hooks</li>
          <li>TypeScript / Next.js（入門レベル）</li>
          <li>Git / GitHub を使ったバージョン管理</li>
        </ul>
      </div>
      <div className="about-section">
        <h3 className="about-section__title">今後やってみたいこと</h3>
        <ul className="about-list">
          <li>外部APIと連携したWebアプリの開発</li>
          <li>ポートフォリオサイトの継続的なアップデート</li>
          <li>UIライブラリ（MUIなど）を使ったきれいな画面づくり</li>
        </ul>
      </div>
    </section>
  );
}

// 他のファイルからAboutコンポーネントを利用できるようにexportする
export default About;
