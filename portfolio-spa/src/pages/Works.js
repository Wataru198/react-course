// React本体をインポートする
import React from "react";
// 静的データとして用意した制作物一覧をインポートする
import works from "../data/works.json";
// 1件分の制作物をカードとして表示するWorkCardコンポーネントをインポートする
import WorkCard from "../components/WorkCard";

// 制作物一覧ページ（/works）を表すWorksコンポーネントを定義する
function Works() {
  // JSXとしてページ内容を返す
  return (
    // コンテンツ全体を包む要素
    <section className="page page--works">
      {/* ページのメイン見出し */}
      <h2 className="page-title">Works</h2>
      {/* ページの説明文 */}
      <p className="page-text">
        これまで学習の一環として作成した簡単なWebアプリやコンポーネントの一部を紹介しています。
      </p>

      {/* 制作物カードをグリッドで並べて表示するエリア */}
      <div className="works-grid">
        {/* works配列をmapでループして、1件ずつWorkCardとして描画する */}
        {works.map((work) => (
          // 各要素にユニークなkeyとしてwork.idを指定する
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}

// 他のファイルからWorksコンポーネントを利用できるようにexportする
export default Works;
