import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function ThreadList() {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchThreads = () => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data); // データをコンソールに出力
        setThreads(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
      fetchThreads();
  }, []);

  return (
    <div>
      <div className="header">
        <h1 className="title">掲示板</h1>
        <button className="new-thread-btn" onClick={() => navigate('/threads/new')}>
          スレッドをたてる
        </button>
      </div>

      <div className="container">
        <h2 className="thread-title">新着スレッド</h2>
        <div className="thread-list">
          {threads.map((thread) => (
            <button key={thread.id} className="thread-item">
              {thread.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}





































// import {useEffect, useState} from 'react'
// import { useNavigate } from 'react-router-dom';

// export function ThreadList() {
//     const [threads, setThreads] = useState([]);
//     const navigate = useNavigate();

//   //掲示板APIからデータを取得
//   useEffect(() => {
//     fetch("https://railway.bulletinboard.techtrain.dev/threads")
//     .then((response) => response.json())
//     .then((data) => setThreads(data))
//     .catch((error) => console.error("Error fetching data:", error));
//   },[]);


//   return (
//       <div>
//         {/* ヘッダー */}
//         <div className="header">
//           <h1 calssName="title">掲示板</h1>
//           <button className="new-thread-btn" onClick={() => navigate('/threads/new')}>
//           スレッドをたてる
//           </button>
//         </div>

//         {/* スレッド一覧 */}
//         <div className='container'>
//           <h2 className="thread-title">新着スレッド</h2>
//           <div className="thread-list">
//             {threads.map((thread) => (
//                 <button key={thread.id} className="thread-item">{thread.title}</button>
//             ))}
//           </div>
//         </div>
//       </div>
//   );
// }

  // useEffect(() => {
  //   if (location.state?.refresh) {
  //     fetchThreads();
  //   }
  // }, [location.state]);