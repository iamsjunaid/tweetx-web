import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { BsCardText } from 'react-icons/bs';
import { TbUsersGroup } from 'react-icons/tb';
import { SlUserFollowing } from 'react-icons/sl';
import { db, auth } from '../firebase';
import Navbar from './Navbar';
import halfCircle from '../assets/img/half-pink-circle.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [error, setError] = useState('');

  const getPosts = async (user) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map((doc) => doc.data());

      // Filter postsData based on the condition
      const filteredPosts = postsData.filter((post) => post.userRef === user.email);

      // Set the filtered posts to the state
      setPosts(filteredPosts);
    } catch (error) {
      setError('Error fetching posts:', error.message);
    }
  };

  const getFollowers = async (user) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'followers'));
      const followersData = querySnapshot.docs.map((doc) => doc.data());

      // Filter followersData based on the condition
      const filteredFollowers = followersData.filter(
        (follower) => follower.following === user.email,
      );

      // Set the filtered followers to the state
      setFollowers(filteredFollowers);
    } catch (error) {
      setError('Error fetching followers:', error.message);
    }
  };

  const getFollowings = async (user) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'followers'));
      const followersData = querySnapshot.docs.map((doc) => doc.data());

      // Filter followersData based on the condition
      const filteredFollowers = followersData.filter(
        (follower) => follower.follower === user.email,
      );

      // Set the filtered followers to the state
      setFollowings(filteredFollowers);
    } catch (error) {
      setError('Error fetching followers:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        getPosts(authUser);
        getFollowers(authUser);
        getFollowings(authUser);
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
      <div className="flex flex-col h-screen items-center my-8">
        {user ? (
          <div className="w-3/4 h-screen text-center">
            <div className="flex justify-around">
              <div className="w-24 h-24 flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">{user.email}</h2>
                <p>{user.metadata.lastSignInTime}</p>
              </div>
            </div>
            <ul className="flex w-full justify-around border-t-2 mt-4">
              <li>
                <button type="button" className={`text-gray-500 text-xl flex justify-between items-center ${activeTab === 1 ? 'px-4 border-t-2 border-gray-800' : ''}`} onClick={() => toggleTabs(1)}>
                  <BsCardText />
                  Posts
                </button>
              </li>
              <li>
                <button type="button" className={`text-gray-500 text-xl flex justify-between items-center ${activeTab === 2 ? 'px-4 border-t-2 border-gray-800' : ''}`} onClick={() => toggleTabs(2)}>
                  <TbUsersGroup />
                  Followers
                </button>
              </li>
              <li>
                <button type="button" className={`text-gray-500 text-xl flex justify-between items-center ${activeTab === 3 ? 'px-4 border-t-2 border-gray-800' : ''}`} onClick={() => toggleTabs(3)}>
                  <SlUserFollowing />
                  Following
                </button>
              </li>
            </ul>
            <div className="flex flex-col items-center">
              <ul className={`${activeTab === 1 ? 'w-full flex flex-col gap-4 justify-around' : 'hidden'}`}>
                {posts.map((post, index) => (
                  <li key={post.id || index} className="w-4/5 h-48 mx-auto shadow-lg rounded-md py-8 pl-8 flex">
                    <div className="w-24 h-[5rem] flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
                    <div className="w-3/4 h-32 flex flex-col justify-center gap-4 pl-12">
                      <h3 className="font-semibold text-2xl">{post.title}</h3>
                      <p>{post.content}</p>
                    </div>
                    <div className="w-1/4 flex justify-end items-center">
                      <img src={halfCircle} className="w-52 h-32" alt="pink-circle" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className={`${activeTab === 2 ? 'flex flex-col gap-4 w-3/4' : 'hidden'}`}>
                {followers.length !== 0 ? (followers.map((follower, index) => (
                  <div key={follower.id || index} className="w-full mx-auto my-4">
                    <div className="flex justify-between text-xl items-center gap-4">
                      <div className="w-12 h-12 flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
                      <div className="flex flex-col">
                        <h2>{follower.follower}</h2>
                      </div>
                    </div>
                  </div>
                ))) : (<div>No followers available</div>)}
              </div>
              <div className={`${activeTab === 3 ? 'flex flex-col gap-4 w-3/4' : 'hidden'}`}>
                {followings.length !== 0 ? (followings.map((following, index) => (
                  <div key={following.id || index} className="w-full mx-auto my-4">
                    <div className="flex justify-between text-xl items-center gap-4">
                      <div className="w-12 h-12 flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
                      <div className="flex flex-col">
                        <h2>{following.following}</h2>
                      </div>
                    </div>
                  </div>
                ))) : (<div>You are not following anyone</div>)}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {error ? <p className="text-red-500">{error}</p> : null}
      </div>
    </>
  );
};

export default Profile;
