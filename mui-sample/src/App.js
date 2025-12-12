// Reactの機能を使うためにReactをインポートする
import React from "react";
// MUIのボタンコンポーネントをインポートする
import Button from "@mui/material/Button";
// MUIの画面レイアウト用コンテナコンポーネントをインポートする
import Container from "@mui/material/Container";
// MUIの文字表示用コンポーネントをインポートする
import Typography from "@mui/material/Typography";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // 画面に表示する内容（JSX）を返す
  return (
    // 画面の中央寄せレイアウトにするためのコンテナ
    <Container
      maxWidth="sm" // 画面幅を「small」サイズに制限する
      style={{
        // 上下左右の余白（パディング）を設定する
        paddingTop: "40px",
        textAlign: "center", // 文字やボタンを中央寄せにする
      }}
    >
      {/* アプリのタイトルを表示する */}
      <Typography
        variant="h4" // 見出しレベルのサイズ（h4相当の大きさ）
        component="h1" // HTML上ではh1タグとしてレンダリングする
        gutterBottom // タイトルの下に自動で余白をつける
      >
        Day5 MUI サンプル
      </Typography>

      {/* 説明文を表示する */}
      <Typography
        variant="body1" // 通常の本文サイズ
        component="p" // HTML上ではpタグとしてレンダリングする
        gutterBottom // 下に余白をつける
      >
        これは MUI を使って作成した最初のサンプル画面です。
      </Typography>

      {/* MUIのボタンコンポーネントを表示する */}
      <Button
        variant="contained" // 塗りつぶしスタイルのボタン
        onClick={() => alert("MUIボタンがクリックされました！")} // クリック時にアラートを表示する
      >
        MUIボタン
      </Button>
    </Container>
  );
}

// 他のファイルからこのAppコンポーネントを使えるようにする
export default App;
