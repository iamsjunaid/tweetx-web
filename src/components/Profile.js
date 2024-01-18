import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [posts, setPosts] = useState([]);

  const getPosts = async (user) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map((doc) => doc.data());

      // Filter postsData based on the condition
      const filteredPosts = postsData.filter((post) => post.userRef === user.email);

      // Set the filtered posts to the state
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        getPosts(authUser); // Call getPosts with authUser instead of user
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleTabs = (id) => {
    setActiveTab(id);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen items-center">
        <h1>Profile</h1>
        {user ? (
          <div className="w-3/4 bg-red-500 h-screen text-center">
            <div className="flex justify-around">
              <div className="w-24 h-24 flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
              <div className="flex flex-col">
                <h2>{user.email}</h2>
                <p>{user.metadata.lastSignInTime}</p>
              </div>
            </div>
            <ul className="flex w-full justify-around">
              <li><button type="button" onClick={() => toggleTabs(1)}>Post</button></li>
              <li><button type="button" onClick={() => toggleTabs(2)}>Followers</button></li>
              <li><button type="button" onClick={() => toggleTabs(3)}>Following</button></li>
            </ul>
            <div className="flex flex-col items-center">
              <div className={`${activeTab === 1 ? 'block' : 'hidden'}`}>
                posts
                {posts.map((post, index) => (
                  <div key={post.id || index}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                ))}
              </div>
              <div className={`${activeTab === 2 ? 'block' : 'hidden'}`}>followers</div>
              <div className={`${activeTab === 3 ? 'block' : 'hidden'}`}>following</div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
