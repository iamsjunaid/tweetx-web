import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Tweetx from './components/Tweetx';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Users from './components/Users';

function App() {
  return (
    <Router>
      <div className="App">
        <section>
          <Routes>
            <Route path="/home" element={<Tweetx />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
