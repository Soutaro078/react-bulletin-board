import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ThreadPosts.css";

export const ThreadPosts = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [offset, setOffset] = useState(0); // 現在のオフセット
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const threadTitle = location.state?.title || "スレッド";

  const fetchPosts = async (newOffset) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${newOffset}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.ErrorMessageJP || "データ取得に失敗しました");
      }

      const data = await response.json();
      setPosts(data.posts);
      setOffset(newOffset); // ここでオフセットを更新
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: newPost }),
        }
      );

      if (!response.ok) {
        throw new Error("投稿に失敗しました");
      }

      setNewPost(""); // フォームをクリア
      fetchPosts(offset); // 現在のページの投稿を再取得
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchPosts(0); // 初回は offset 0 で取得
  }, [thread_id]);

  return (
    <div className="thread-container">
      <h1 className="thread-title">「{threadTitle}」 の投稿一覧</h1>

      <div className="thread-content">
        {/* 60% 左側: 投稿一覧 */}
        <div className="post-list-container">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className="post-item">
                  <p>{post.post}</p>
                </li>
              ))
            ) : (
              <p>投稿がありません。</p>
            )}
          </ul>

          {/* ページネーション機能 */}
          {loading && <p>Loading...</p>}
          <div className="pagination-buttons">
            {offset > 0 && (
              <button onClick={() => fetchPosts(Math.max(0, offset - 10))}>
                前の投稿へ
              </button>
            )}
            <button onClick={() => fetchPosts(offset + 10)}>もっと見る</button>
          </div>
        </div>

        {/* 40% 右側: 投稿フォーム */}
        <div className="post-form-container">
          <form className="post-form" onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="投稿しよう！"
            />
            <button type="submit">投稿</button>
          </form>
          <button className="to-top-page" onClick={() => navigate("/")}>
            Topに戻る
          </button>
        </div>
      </div>
    </div>
  );
};






// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import "./ThreadPosts.css"; 

// export const ThreadPosts = () => {
//   const { thread_id } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [offset, setOffset] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const threadTitle = location.state?.title || "スレッド";

//   const fetchPosts = async (offsetValue = 0) => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offsetValue}`
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.ErrorMessageJP || "データ取得に失敗しました");
//       }

//       const data = await response.json();
//       setPosts(data.posts);
//       setOffset(offsetValue + 10);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     if (newPost.trim() === "") return;

//     try {
//       const response = await fetch(
//         `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ post: newPost }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.ErrorMessageJP || "投稿に失敗しました");
//       }

//       setNewPost("");
//       fetchPosts();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [thread_id]);

//   return (
//     <div className="thread-container">
//       <h1 className="thread-title">スレッド 「{threadTitle}」 の投稿一覧</h1>

//       {/* 投稿フォーム */}
//       <form className="post-form" onSubmit={handlePostSubmit}>
//         <textarea
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//           placeholder="投稿しよう！"
//         />
//         <button type="submit">投稿</button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* 投稿一覧 */}
//       <ul className="post-list">
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <li key={post.id} className="post-item">
//               <p>{post.post}</p>
//             </li>
//           ))
//         ) : (
//           <p>投稿がありません。</p>
//         )}
//       </ul>

//       {loading && <p>Loading...</p>}
//       {!loading && (
//         <button onClick={() => fetchPosts(offset)}>もっと見る</button>
//       )}

//       <button className="to-top-page" onClick={() => navigate("/")}>
//         Topに戻る
//       </button>
//     </div>
//   );
// };




















