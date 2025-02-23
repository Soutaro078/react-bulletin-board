import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThreadList } from './ThreadList';
import { NewThread } from './NewThread';
import { ThreadPosts } from "./ThreadPosts";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThreadList />} />
        <Route path="/threads/new" element={<NewThread />} />
        <Route path="/threads/:thread_id/posts" element={<ThreadPosts />} /> 
      </Routes>
    </Router>
  );
}

export default App
