import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NewThread() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    try {
      const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        navigate('/', { state: { refresh: true } }); // スレッド一覧に戻る際、更新の指示を渡す
      } else {
        alert("スレッド作成に失敗しました");
      }
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="container">
      <h2>新規スレッド作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="スレッドのタイトルを入力"
        />
        <button type="submit">作成</button>
      </form>
      <button className="to-top-page-new" onClick={() => navigate('/')}>
          Topに戻る
      </button>
    </div>
  );
}

