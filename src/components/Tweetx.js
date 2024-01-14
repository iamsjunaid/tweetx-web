import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Tweetx = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { uid } = user;
        // ...
        console.log('uid', uid);
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
      navigate('/');
      console.log('Signed out successfully');
    }).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div>
      {error ? <p>{error}</p> : null}
      <h1> Tweetx </h1>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Tweetx;
