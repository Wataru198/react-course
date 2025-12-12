// React本体をインポートする
import React from "react";
// ReactDOMをインポートして、Reactコンポーネントをブラウザに描画できるようにする
import ReactDOM from "react-dom/client";
// React Queryのクライアントを作成するための機能をインポートする
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// アプリ本体のコンポーネントAppをインポートする
import App from "./App";

// React Query のクライアントインスタンスを作成する
const queryClient = new QueryClient();

// index.htmlの中にあるrootという要素を取得して、そこにReactアプリを描画する準備をする
const root = ReactDOM.createRoot(document.getElementById("root"));

// 実際にReactアプリを描画する
root.render(
  // StrictModeは開発中に問題を早めに気づけるようにするためのモード
  <React.StrictMode>
    {/* React Queryをアプリ全体で使えるようにするためのProvider */}
    <QueryClientProvider client={queryClient}>
      {/* アプリ本体のコンポーネント */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
