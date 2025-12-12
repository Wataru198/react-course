// Reactの機能を使うためにReactとuseStateをインポートする
import React, { useState } from "react";
// MUIのAppBar（画面上部のバー）コンポーネントをインポートする
import AppBar from "@mui/material/AppBar";
// AppBarの中で横並びレイアウトを行うToolbarコンポーネントをインポートする
import Toolbar from "@mui/material/Toolbar";
// 文字表示用のコンポーネントをインポートする
import Typography from "@mui/material/Typography";
// 画面幅を制御するためのコンテナコンポーネントをインポートする
import Container from "@mui/material/Container";
// アイコン付きボタン（ハンバーガーメニュー用）をインポートする
import IconButton from "@mui/material/IconButton";
// 右上などに配置する通常ボタンをインポートする
import Button from "@mui/material/Button";
// 画面の横からスライド表示されるメニュー（Drawer）をインポートする
import Drawer from "@mui/material/Drawer";
// Drawerの中に配置するリスト全体をインポートする
import List from "@mui/material/List";
// リストの1行分を表すコンポーネントをインポートする
import ListItem from "@mui/material/ListItem";
// クリック可能なリスト項目を表すコンポーネントをインポートする
import ListItemButton from "@mui/material/ListItemButton";
// リストのテキスト部分を表示するコンポーネントをインポートする
import ListItemText from "@mui/material/ListItemText";
// 区切り線を表示するコンポーネントをインポートする
import Divider from "@mui/material/Divider";
// レイアウト調整用のBoxコンポーネントをインポートする
import Box from "@mui/material/Box";
// メニューアイコン（ハンバーガーアイコン）をインポートする
import MenuIcon from "@mui/icons-material/Menu";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // Drawer（サイドメニュー）が開いているかどうかを管理する状態。初期値はfalse（閉じている）
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // メニューアイコンがクリックされたときにDrawerを開く処理
  const handleOpenDrawer = () => {
    // Drawerを開いている状態（true）に更新する
    setIsDrawerOpen(true);
  };

  // Drawerを閉じるときの処理（背景クリックやメニュー選択時に呼び出す）
  const handleCloseDrawer = () => {
    // Drawerを閉じている状態（false）に更新する
    setIsDrawerOpen(false);
  };

  // Drawer内のメニュー項目がクリックされたときの処理
  const handleSelectMenu = (menuKey) => {
    // どのメニューが選択されたかをアラートで表示する（実際のアプリでは画面遷移などに使う）
    alert(`「${menuKey}」メニューがクリックされました`);
    // メニューを選択したらDrawerを閉じる
    handleCloseDrawer();
  };

  // 画面に表示する内容（JSX）を返す
  return (
    // Reactコンポーネントは1つの親要素で囲む必要があるので、<div>で全体を囲む
    <div>
      {/* 画面上部のヘッダー部分（AppBar） */}
      <AppBar position="static">
        {/* AppBarの中で子要素を横並びに配置するためのコンテナ */}
        <Toolbar>
          {/* 左側に配置するメニューアイコン（ハンバーガーメニュー） */}
          <IconButton
            edge="start" // 左端に寄せる指定
            color="inherit" // AppBarのテーマ色に合わせたアイコン色を使う
            aria-label="menu" // アクセシビリティ用のラベル
            onClick={handleOpenDrawer} // クリックされたらDrawerを開く
            sx={{ mr: 2 }} // 右側に少し余白（margin-right）をつける
          >
            {/* 実際に表示するアイコン */}
            <MenuIcon />
          </IconButton>

          {/* 左側のタイトル（アプリ名） */}
          <Typography
            variant="h6" // 見出しレベルのサイズ（h6相当）
            component="div" // HTML上ではdivタグとしてレンダリング
            sx={{ flexGrow: 1 }} // 右側のボタンを右端に寄せるために余白を広げる
          >
            Day5 MUI サンプル（Drawer付き）
          </Typography>

          {/* 右側に表示するヘッダーボタン */}
          <Button
            color="inherit" // AppBarのテーマ色に合わせたボタン色を使う
            onClick={() => alert("ヘッダーボタンがクリックされました")}
          >
            ヘッダーボタン
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer（サイドメニュー）コンポーネント */}
      <Drawer
        anchor="left" // 画面の左側から表示する
        open={isDrawerOpen} // 開いているかどうかの状態を指定する
        onClose={handleCloseDrawer} // Drawerの外側をクリックしたときなどに呼ばれる処理
      >
        {/* Drawerの中身全体を囲むコンテナ */}
        <Box
          sx={{ width: 250 }} // Drawerの幅を250pxにする
          role="presentation" // スクリーンリーダー向けの役割指定
          onClick={handleCloseDrawer} // 中のどこかをクリックしたらDrawerを閉じる
          onKeyDown={handleCloseDrawer} // キーボード操作（Escなど）でも閉じる
        >
          {/* 上部にアプリ名を表示する */}
          <Typography variant="h6" sx={{ m: 2 }}>
            メニュー
          </Typography>

          {/* 視覚的な区切り線 */}
          <Divider />

          {/* メニュー項目のリスト */}
          <List>
            {/* Homeメニュー */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelectMenu("Home")}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            {/* Profileメニュー */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelectMenu("Profile")}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            {/* Settingsメニュー */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelectMenu("Settings")}>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* さらに下側に区切り線を追加 */}
          <Divider />

          {/* 下側に別セクションのメニューを追加する例 */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelectMenu("Logout")}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 画面のメインコンテンツ部分 */}
      <Container
        maxWidth="sm" // 横幅をsmallサイズに制限する
        style={{
          paddingTop: "40px", // 上側に余白をつける
          textAlign: "center", // 中央寄せにする
        }}
      >
        {/* メインタイトル */}
        <Typography
          variant="h4" // 見出しレベルのサイズ（h4相当）
          component="h1" // HTML上ではh1タグとしてレンダリング
          gutterBottom // 下側にマージンを自動で付与
        >
          MUI Drawer 練習
        </Typography>

        {/* 説明文 */}
        <Typography
          variant="body1" // 通常の本文サイズ
          component="p" // HTML上ではpタグとしてレンダリング
          gutterBottom // 下側にマージンを自動で付与
        >
          左上のメニューアイコンをクリックすると、サイドメニューが開きます。
          メニューをクリックするとアラートが表示され、メニューが閉じます。
        </Typography>

        {/* 中央のボタン（前回までのサンプルと同様） */}
        <Button
          variant="contained" // 塗りつぶしスタイルのボタン
          onClick={() => alert("中央のMUIボタンがクリックされました！")}
        >
          中央のMUIボタン
        </Button>
      </Container>
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを使えるようにする
export default App;
