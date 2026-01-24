// React本体をインポートする
import React from "react";

// 1件分の実績データをカードとして表示するWorkCardコンポーネントを定義する
// 親コンポーネントからworkという名前でデータを受け取る
function WorkCard({ work }) {
  // JSXとしてカードの内容を返す
  return (
    // カード全体を包む要素
    <article className="work-card">
      {/* 実績のサムネイル画像を表示する */}
      <div className="work-card__image-wrapper">
        {/* 画像URLと代替テキストはpropsで渡されたworkから取得する */}
        <img
          src={work.image}
          alt={work.title}
          className="work-card__image"
        />
      </div>
      {/* タイトルと説明をまとめて表示するエリア */}
      <div className="work-card__body">
        {/* 実績タイトル */}
        <h3 className="work-card__title">{work.title}</h3>
        {/* 実績の説明文 */}
        <p className="work-card__description">{work.description}</p>
        {/* 任意でタグや技術スタックを表示する（あれば） */}
        {work.tags && work.tags.length > 0 && (
          <ul className="work-card__tags">
            {work.tags.map((tag) => (
              <li key={tag} className="work-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

// 他のファイルからWorkCardコンポーネントを利用できるようにexportする
export default WorkCard;
