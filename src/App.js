import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Tweetx from './components/Tweetx';

function App() {
  return (
    <Router>
      <div className="App">
        <section>
          <Routes>
            <Route path="/home/:personName" element={<Tweetx />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/login/:personName" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
