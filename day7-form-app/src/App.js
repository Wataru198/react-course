// Reactというライブラリ本体をインポートする
import React from "react";
// useStateというReactのHook（状態を管理する仕組み）をインポートする
import { useState } from "react";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // 名前入力用の状態nameと、その値を更新するためのsetName関数を定義する
  const [name, setName] = useState("");
  // メールアドレス入力用の状態emailと、その値を更新するためのsetEmail関数を定義する
  const [email, setEmail] = useState("");
  // コメント入力用の状態commentと、その値を更新するためのsetComment関数を定義する
  const [comment, setComment] = useState("");

  // 名前の最大文字数を定数として定義する（ここでは20文字までとする）
  const NAME_MAX_LENGTH = 20;
  // メールの最大文字数を定数として定義する（ここでは30文字までとする）
  const EMAIL_MAX_LENGTH = 30;
  // コメントの最大文字数を定数として定義する（ここでは200文字までとする）
  const COMMENT_MAX_LENGTH = 200;

  // 名前入力欄が変更されたときに呼び出される処理
  const handleChangeName = (event) => {
    // event.target.value に入力された文字列が入っているので、それをname状態に反映する
    setName(event.target.value);
  };

  // メール入力欄が変更されたときに呼び出される処理
  const handleChangeEmail = (event) => {
    // 入力されたメールアドレスをemail状態に反映する
    setEmail(event.target.value);
  };

  // コメント入力欄が変更されたときに呼び出される処理
  const handleChangeComment = (event) => {
    // 入力されたコメントをcomment状態に反映する
    setComment(event.target.value);
  };

  // 文字数カウント表示と「未入力です」の表示をまとめるための補助関数を定義する
  // value: 実際の入力文字列、max: 最大文字数
  const renderLengthInfo = (value, max) => {
    // 現在の文字数をlengthに代入する
    const length = value.length;

    // 未入力（文字数0）の場合は「未入力です」と表示する
    if (length === 0) {
      return (
        <p
          style={{
            fontSize: "12px", // 小さめの文字サイズ
            color: "#888", // グレー
            marginTop: "4px", // 上の余白
          }}
        >
          未入力です（0 / {max}文字）
        </p>
      );
    }

    // 入力がある場合は「現在の文字数 / 最大文字数」を表示する
    return (
      <p
        style={{
          fontSize: "12px",
          color: length > max ? "red" : "#555", // 万が一maxを超えたら赤で表示（maxLength属性で通常は超えない）
          marginTop: "4px",
        }}
      >
        {length} / {max}文字
      </p>
    );
  };

  // 画面に表示する JSX（HTMLのような見た目の記述）を return で返す
  return (
    // アプリ全体を囲む div 要素
    <div
      style={{
        // 画面の余白（パディング）を40pxに設定する
        padding: "40px",
        // 中身を中央寄せにする
        textAlign: "center",
      }}
    >
      {/* アプリのタイトルを表示する h1 要素 */}
      <h1>Day7 フォームアプリ（追加要件2：未入力・文字数制限）</h1>

      {/* フォーム部分を囲むコンテナ */}
      <div
        style={{
          border: "1px solid #ccc", // 枠線を付ける
          padding: "16px", // 内側の余白
          marginBottom: "24px", // 下側の余白
          maxWidth: "600px", // フォームの最大幅
          margin: "0 auto 24px", // 中央寄せ＋下方向に余白
          textAlign: "left", // ラベルと入力欄は左寄せにする
        }}
      >
        {/* フォームの見出し */}
        <h2>入力フォーム</h2>

        {/* 名前入力欄 */}
        <div style={{ marginBottom: "16px" }}>
          {/* 名前ラベル */}
          <label style={{ display: "block", marginBottom: "4px" }}>
            名前（最大{NAME_MAX_LENGTH}文字）
          </label>
          {/* 名前のテキストボックス */}
          <input
            type="text" // テキスト入力用フィールド
            placeholder="お名前を入力してください" // プレースホルダー（薄い説明文）
            value={name} // 表示する値としてname状態を使う
            onChange={handleChangeName} // 入力値が変化するたびにhandleChangeNameが呼ばれる
            maxLength={NAME_MAX_LENGTH} // 入力できる最大文字数を制限する
            style={{ width: "100%", padding: "8px" }} // 横幅と余白の指定
          />
          {/* 名前の文字数カウントと「未入力です」の表示 */}
          {renderLengthInfo(name, NAME_MAX_LENGTH)}
        </div>

        {/* メール入力欄 */}
        <div style={{ marginBottom: "16px" }}>
          {/* メールラベル */}
          <label style={{ display: "block", marginBottom: "4px" }}>
            メールアドレス（最大{EMAIL_MAX_LENGTH}文字）
          </label>
          {/* メールの入力フィールド */}
          <input
            type="email" // メールアドレス用の入力タイプ
            placeholder="メールアドレスを入力してください"
            value={email} // 表示する値としてemail状態を使う
            onChange={handleChangeEmail} // 入力値が変化するたびにhandleChangeEmailが呼ばれる
            maxLength={EMAIL_MAX_LENGTH} // 入力できる最大文字数を制限する
            style={{ width: "100%", padding: "8px" }}
          />
          {/* メールの文字数カウントと「未入力です」の表示 */}
          {renderLengthInfo(email, EMAIL_MAX_LENGTH)}
        </div>

        {/* コメント入力欄 */}
        <div style={{ marginBottom: "16px" }}>
          {/* コメントラベル */}
          <label style={{ display: "block", marginBottom: "4px" }}>
            コメント（最大{COMMENT_MAX_LENGTH}文字）
          </label>
          {/* コメントのテキストエリア */}
          <textarea
            placeholder="コメントを入力してください"
            value={comment} // 表示する値としてcomment状態を使う
            onChange={handleChangeComment} // 入力値が変化するたびにhandleChangeCommentが呼ばれる
            rows={4} // 行数を4行に設定
            maxLength={COMMENT_MAX_LENGTH} // 入力できる最大文字数を制限する
            style={{ width: "100%", padding: "8px" }}
          />
          {/* コメントの文字数カウントと「未入力です」の表示 */}
          {renderLengthInfo(comment, COMMENT_MAX_LENGTH)}
        </div>
      </div>

      {/* 表示部分を囲むコンテナ */}
      <div
        style={{
          border: "1px solid #ccc", // 枠線を付ける
          padding: "16px", // 内側の余白
          maxWidth: "600px", // 最大幅
          margin: "0 auto", // 中央寄せ
          textAlign: "left", // 左寄せ
        }}
      >
        {/* 表示エリアの見出し */}
        <h2>リアルタイム表示</h2>

        {/* 入力された各項目をリアルタイムで表示する */}
        <p>
          <strong>名前：</strong>
          {name || "（未入力）"}
        </p>
        <p>
          <strong>メールアドレス：</strong>
          {email || "（未入力）"}
        </p>
        <p>
          <strong>コメント：</strong>
          {comment || "（未入力）"}
        </p>
      </div>
    </div>
  );
}

// このAppコンポーネントを他のファイルから使えるようにするためのexport
export default App;
