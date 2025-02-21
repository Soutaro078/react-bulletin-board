import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThreadList } from './ThreadList';
import { NewThread } from './NewThread';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThreadList />} />
        <Route path="/threads/new" element={<NewThread />} />
      </Routes>
    </Router>
  );
}

export default App
