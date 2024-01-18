import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from './Navbar';
import halfCircle from '../assets/img/half-pink-circle.png';

const Tweetx = () => {
  const [error, setError] = useState('');
  const [confirmedUser, isConfirmedUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const confirmUser = async (userEmail) => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const userExists = querySnapshot.docs.some((doc) => doc.data().email === userEmail);
    if (userExists) {
      isConfirmedUser(true);
    } else {
      setError('Please login with your registered email');
    }
  };

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsData = querySnapshot.docs.map((doc) => doc.data());
    setPosts(postsData); // Update state with posts data
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        confirmUser(user.email);
        getAllPosts();
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  const handleWritePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      {confirmedUser && loggedIn ? (
        <div>
          <Navbar />
          <div className="my-8 ml-[17.5rem]">
            <button type="button" onClick={handleWritePost} className="px-8 py-2 bg-pink-400 text-white font-bold rounded-md">Write</button>
          </div>
          <ul className="w-full flex flex-col gap-4">
            {posts.map((post, i) => (
              <li key={post.id || i} className="w-[60%] h-48 mx-auto shadow-lg rounded-md py-8 pl-8 flex justify-between">
                <div className="w-12 h-12 flex justify-center items-center rounded-full full border-2 font-bold text-xl" />
                <div className="w-3/4 h-32 flex flex-col justify-center gap-4 pl-12">
                  <h3 className="font-semibold text-2xl">{post.title}</h3>
                  <p>{post.content}</p>
                  <p>
                    By:
                    {' '}
                    {post.userRef}
                  </p>
                </div>
                <div className="w-1/4 flex justify-end items-center">
                  <img src={halfCircle} className="w-52 h-32" alt="pink-circle" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {error ? <p>{error}</p> : null}
        </div>
      )}
    </>
  );
};

export default Tweetx;
