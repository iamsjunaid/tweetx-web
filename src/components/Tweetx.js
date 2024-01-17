import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from './Navbar';

const Tweetx = () => {
  const { personName } = useParams();
  const [error, setError] = useState('');
  const [confirmedUser, isConfirmedUser] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(personName);

  const getData = async (userEmail) => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      if (doc.data().email === userEmail) {
        isConfirmedUser(true);
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        console.log(user.email);
        getData(user.email);
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
    <>
      {confirmedUser && loggedIn
        ? (
          <div>
            <Navbar />
            {error ? <p>{error}</p> : null}
            <h1> Tweetx </h1>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1> Please Login First</h1>
          </div>
        )}
    </>
  );
};

export default Tweetx;
