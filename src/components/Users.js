import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './Navbar';
import { auth, db } from '../firebase';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');
  const [followingStatus, setFollowingStatus] = useState({});

  const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData = querySnapshot.docs.map((doc) => doc.data());
    setUsers(usersData);
  };

  const getCurrentLoggedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      }
    });
  };

  const handleFollowClick = async (userEmail) => {
    const isFollowing = followingStatus[userEmail];

    try {
      if (isFollowing) {
        // If already following, unfollow
        const followersQuery = query(collection(db, 'followers'), where('follower', '==', loggedInUser.email), where('following', '==', userEmail));
        const followersSnapshot = await getDocs(followersQuery);
        const followerDoc = followersSnapshot.docs[0];

        if (followerDoc) {
          await deleteDoc(doc(db, 'followers', followerDoc.id));
        }

        // Update local state to reflect unfollow
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userEmail]: false,
        }));
      } else {
        // If not following, follow
        const followersCollection = collection(db, 'followers');
        await addDoc(followersCollection, {
          follower: loggedInUser.email,
          following: userEmail,
        });

        // Update local state to reflect follow
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userEmail]: true,
        }));
      }
    } catch (error) {
      setError('Unable to follow/unfollow at the moment');
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
    getCurrentLoggedInUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="shadow-lg rounded-md w-3/5 h-3/4 flex flex-col mx-auto my-8 p-8">
        {users.map((user, i) => (
          user.email !== loggedInUser.email ? (
            <div key={user.uid || i} className="flex justify-between items-center w-full mx-auto my-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
                <div className="flex flex-col">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                className={`px-8 py-2 ${followingStatus[user.email] ? ('bg-white text-gray-400 border-2') : ('bg-pink-400 text-white font-bold rounded-md')}`}
                onClick={() => handleFollowClick(user.email)}
              >
                {followingStatus[user.email] ? ('unfollow') : ('follow')}
              </button>
            </div>
          ) : null
        ))}
      </div>
    </>
  );
};

export default Users;
