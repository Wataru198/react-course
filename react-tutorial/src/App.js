// Reactの機能を使うためにReactとuseStateとuseEffectをインポートする
import React, { useState, useEffect } from "react";

// localStorageに保存するときに使うキー名を定数として定義する
const STORAGE_KEY = "day2-todos";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // TODOの入力欄の文字を管理する状態。初期値は空文字にする
  const [todoText, setTodoText] = useState("");

  // 画面に表示するTODOの一覧を管理する状態。
  // 初期値を設定するときにlocalStorageの中身を読み込む
  const [todos, setTodos] = useState(() => {
    // 初期化時にlocalStorageから前回保存したTODO一覧の文字列を取り出す
    const savedTodos = localStorage.getItem(STORAGE_KEY);

    // 何も保存されていない場合は空配列を返す
    if (savedTodos === null) {
      return [];
    }

    try {
      // JSON形式の文字列をJavaScriptの値（ここでは配列）に変換する
      const parsed = JSON.parse(savedTodos);

      // 配列として保存されていない場合に備えて型チェックを行う
      if (Array.isArray(parsed)) {
        return parsed;
      }

      // 想定外の形式だった場合は空配列を返す
      return [];
    } catch (error) {
      // JSON.parseに失敗した場合も空配列にフォールバックする
      console.error("Failed to parse todos from localStorage:", error);
      return [];
    }
  });

  // todosの値が変わるたびに実行される処理
  useEffect(() => {
    // todos配列をJSON形式の文字列に変換してlocalStorageに保存する
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); // 第2引数の配列にtodosを渡すと、todosが変わるたびに実行される

  // 「追加」ボタンがクリックされたときに実行される処理
  const handleAddTodo = () => {
    // 入力欄が空文字の場合は何もしないで終了する
    if (todoText === "") {
      return;
    }

    // 新しく追加するTODO1件分のオブジェクトを作成する
    const newTodo = {
      // 一意なIDとして現在時刻のミリ秒を使う
      id: Date.now(),
      // 表示用の文字として入力されたテキストを使う
      text: todoText,
      // チェック状態（完了かどうか）を管理するフラグ。追加時は未完了なのでfalse
      completed: false,
    };

    // 既存のtodos配列にnewTodoを追加した新しい配列を作り、状態を更新する
    setTodos([...todos, newTodo]);

    // 入力欄を空文字に戻してリセットする
    setTodoText("");
  };

  // チェックボックスがクリックされたときに実行される処理
  const handleToggleCompleted = (id) => {
    // todos配列をもとに、新しい配列を作成する
    const updatedTodos = todos.map((todo) => {
      // クリックされたTODOのidと一致する場合だけcompletedを反転させる
      if (todo.id === id) {
        return {
          ...todo, // 他の項目はそのままコピー
          completed: !todo.completed, // completedをtrue/falseで反転させる
        };
      }
      // 一致しないTODOはそのまま返す
      return todo;
    });

    // 状態を更新して画面に反映させる
    setTodos(updatedTodos);
  };

  // 画面に表示する内容を返す
  return (
    // アプリ全体を囲むdivタグ
    <div>
      {/* アプリのタイトルを表示する */}
      <h1>Day2 TODOアプリ</h1>

      {/* TODOアプリの説明文 */}
      <p>ここにTODOアプリを実装していきます。</p>

      {/* TODO入力欄と追加ボタンのエリア */}
      <div>
        {/* 入力欄のタイトル */}
        <h2>TODO入力</h2>

        {/* TODOを入力するテキストボックス */}
        <input
          type="text" // テキストを入力するための入力欄
          placeholder="TODOを入力してください" // 何を入力するかのヒントを表示する
          value={todoText} // 入力欄に表示する値としてtodoTextを使う
          onChange={(event) => setTodoText(event.target.value)} // 入力が変わるたびにtodoTextを更新する
        />

        {/* クリックするとhandleAddTodoが実行される「追加」ボタン */}
        <button onClick={handleAddTodo}>追加</button>
      </div>

      {/* TODO一覧を表示するエリア */}
      <div>
        {/* 一覧のタイトル */}
        <h2>TODO一覧</h2>

        {/* todos配列の中身を1件ずつ<li>タグで表示する */}
        <ul>
          {todos.map((todo) => (
            // 各TODOをリストの1行として表示する。keyには一意なidを指定する
            <li key={todo.id}>
              {/* TODOの完了状態を表すチェックボックス */}
              <input
                type="checkbox" // チェックボックス入力
                checked={todo.completed} // completedの値に応じてオン/オフを切り替える
                onChange={() => handleToggleCompleted(todo.id)} // クリックされたらhandleToggleCompletedを呼び出す
              />
              {/* TODOの文字。完了している場合は表示の仕方を変える */}
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none", // 完了なら取り消し線を引く
                }}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>

        {/* TODOが1件もない場合の補足メッセージ */}
        {todos.length === 0 && <p>まだTODOがありません。</p>}
      </div>
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを使えるようにする
export default App;
