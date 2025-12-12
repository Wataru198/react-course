// Reactの機能を使うためにReactとuseStateとuseEffectをインポートする
import React, { useState, useEffect } from "react";

// localStorageに保存するときに使うキー名を定数として定義する
const STORAGE_KEY = "day2-todos";

// アプリ全体を表すコンポーネントAppを定義する
function App() {
  // TODOの入力欄の文字を管理する状態。初期値は空文字にする
  const [todoText, setTodoText] = useState("");

  // TODOに紐づく日付（期限など）を管理する状態。初期値は空文字にする
  const [todoDate, setTodoDate] = useState("");

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

  // 並べ替えモードを管理する状態。
  // false: 追加した順, true: 完了したTODOを上に表示
  const [sortByCompleted, setSortByCompleted] = useState(false);

  // 日付での並べ替えモードを管理する状態。
  // false: 日付でソートしない, true: 日付が早い順にソートする
  const [sortByDate, setSortByDate] = useState(false);

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
      // 入力された日付。未入力の場合は空文字のまま
      date: todoDate,
    };

    // 既存のtodos配列にnewTodoを追加した新しい配列を作り、状態を更新する
    setTodos([...todos, newTodo]);

    // 入力欄を空文字に戻してリセットする
    setTodoText("");
    // 日付欄もリセットする
    setTodoDate("");
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

  // 「削除」ボタンがクリックされたときに実行される処理
  const handleDeleteTodo = (id) => {
    // 指定されたid以外のTODOだけを残した新しい配列を作る
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    // 状態を更新して画面に反映させる
    setTodos(filteredTodos);
  };

  // 画面に表示する際に使う並べ替え後のTODO一覧を作る
  let displayTodos = [...todos];

  // sortByCompletedがtrueのときは完了しているTODOを上に表示する
  if (sortByCompleted) {
    displayTodos = [...displayTodos].sort((a, b) => {
      // completedがtrueのものを先にしたいので、trueを1, falseを0として比較する
      return Number(b.completed) - Number(a.completed);
    });
  }

  // sortByDateがtrueのときは日付の早い順に並べ替える
  if (sortByDate) {
    displayTodos = [...displayTodos].sort((a, b) => {
      // どちらかの日付が未設定の場合の扱いを決める
      if (!a.date && !b.date) {
        // 両方日付がない場合は順番を変えない
        return 0;
      }
      if (!a.date) {
        // aに日付がなく、bに日付がある場合はbを先にする
        return 1;
      }
      if (!b.date) {
        // bに日付がなく、aに日付がある場合はaを先にする
        return -1;
      }
      // どちらも日付がある場合は文字列として比較（YYYY-MM-DD形式ならこれで日付順になる）
      return a.date.localeCompare(b.date);
    });
  }

  // 画面に表示する内容を返す
  return (
    // アプリ全体を囲むdivタグ
    <div>
      {/* アプリのタイトルを表示する */}
      <h1>Day2 TODOアプリ（追加要件3：日付＋日付ソート付き）</h1>

      {/* TODOアプリの説明文 */}
      <p>TODOに日付を追加し、日付や完了状態で並べ替えることができます。</p>

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

        {/* TODOに紐づく日付を入力するための入力欄 */}
        <input
          type="date" // 日付を入力するための入力欄
          value={todoDate} // 入力欄に表示する値としてtodoDateを使う
          onChange={(event) => setTodoDate(event.target.value)} // 入力が変わるたびにtodoDateを更新する
          style={{ marginLeft: "8px" }} // テキスト入力欄との間に余白を空ける
        />

        {/* クリックするとhandleAddTodoが実行される「追加」ボタン */}
        <button onClick={handleAddTodo} style={{ marginLeft: "8px" }}>
          追加
        </button>
      </div>

      {/* 並べ順を切り替えるボタンのエリア */}
      <div style={{ marginTop: "16px" }}>
        {/* 完了状態による並べ替えの説明とボタン */}
        <p>
          完了状態での並べ順:
          {sortByCompleted ? " 完了したTODOを上に表示" : " 追加した順のまま"}
        </p>
        <button onClick={() => setSortByCompleted(!sortByCompleted)}>
          {sortByCompleted
            ? "完了による並べ替えをオフにする"
            : "完了したTODOを上に表示する"}
        </button>

        {/* 日付による並べ替えの説明とボタン */}
        <p style={{ marginTop: "8px" }}>
          日付での並べ順:
          {sortByDate ? " 日付の早いTODOを上に表示" : " 日付による並べ替えなし"}
        </p>
        <button onClick={() => setSortByDate(!sortByDate)}>
          {sortByDate
            ? "日付による並べ替えをオフにする"
            : "日付の早い順に並べ替える"}
        </button>
      </div>

      {/* TODO一覧を表示するエリア */}
      <div style={{ marginTop: "16px" }}>
        {/* 一覧のタイトル */}
        <h2>TODO一覧</h2>

        {/* displayTodos配列の中身を1件ずつ<li>タグで表示する */}
        <ul>
          {displayTodos.map((todo) => (
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
                  marginRight: "8px", // 文字と日付の間に余白を入れる
                }}
              >
                {todo.text}
              </span>
              {/* TODOに紐づく日付。設定されていない場合は「日付なし」と表示する */}
              <span style={{ marginRight: "8px" }}>
                {todo.date ? `（日付: ${todo.date}）` : "（日付なし）"}
              </span>
              {/* このTODOを削除するためのボタン */}
              <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
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

