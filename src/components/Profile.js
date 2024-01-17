import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>
            Email:
            {' '}
            {user.email}
          </p>
          <p>
            Last Sign-In Time:
            {' '}
            {user.metadata && user.metadata.lastSignInTime}
          </p>
          {/* Add more user properties as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Profile;
