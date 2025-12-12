// React本体をインポートする
import React from "react";
// useQueryフックをインポートして、React Queryでデータ取得を行う
import { useQuery } from "@tanstack/react-query";
// APIコール用にaxiosをインポートする
import axios from "axios";

// ダミーAPI（JSONPlaceholder）からデータを取得する関数を定義する
// この関数はReact Queryから呼ばれる
const fetchTodo = async () => {
  // JSONPlaceholderという無料のテスト用APIからTODOデータを1件取得する
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  // axiosのレスポンスから実際のデータ部分（response.data）だけを返す
  return response.data;
};

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // useQueryフックを使ってAPIからデータを取得する
  // 第1引数: クエリキー（このデータを識別するための名前）
  // 第2引数: 実際にデータを取りに行く関数
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["sampleTodo"], // このクエリを識別するためのキー
    queryFn: fetchTodo, // 実際にAPIを呼び出す関数
    enabled: false, // 初期表示時には自動で実行しない設定（ボタンを押したときだけ取得する）
  });

  // ローディング中の表示を定義する
  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>React Query サンプル</h1>
        <p>データ取得中...</p>
      </div>
    );
  }

  // エラーが発生したときの表示を定義する
  if (isError) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>React Query サンプル</h1>
        <p>データ取得中にエラーが発生しました。</p>
        {/* error.messageがあれば詳細を表示する */}
        <p>{String(error?.message || "")}</p>
      </div>
    );
  }

  // 通常時の画面表示を定義する
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      {/* アプリのタイトル */}
      <h1>React Query サンプル</h1>

      {/* 説明文 */}
      <p>ボタンを押すと、ダミーAPIからTODOデータを取得します。</p>

      {/* データ取得を実行するボタン */}
      <button onClick={() => refetch()}>データを取得する</button>

      {/* dataが取得できている場合にだけ詳細を表示する */}
      {data && (
        <div style={{ marginTop: "24px", textAlign: "left", display: "inline-block" }}>
          <h2>取得したTODOデータ</h2>
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Completed: {data.completed ? "true" : "false"}</p>
        </div>
      )}
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを使えるようにする
export default App;
