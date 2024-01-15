import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Navbar from './Navbar';

const Tweetx = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div className="text-center bg-pink-400">
      <Navbar />
      {error ? <p>{error}</p> : null}
      <h1> Tweetx </h1>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Tweetx;
