import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import typing from '../assets/img/typing.svg';

const CreatePost = () => {
  const [userInfo, setUserInfo] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Please fill all the fields');
      return;
    }

    if (title.length > 100 || content.length > 500) {
      setMessage('Title should be less than 100 characters and content should be less than 500 characters');
      return;
    }

    try {
      const res = await addDoc(collection(db, 'posts'), {
        title,
        content,
        userRef: userInfo.email,
      });
      console.log(res);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }

    console.log('Post created successfully');
  };

  const navigateBack = () => {
    navigate('/home');
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-4 w-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-4/5 mx-auto gap-4 h-full">
          <div className="w-full text-left">
            <button type="button" onClick={navigateBack} className="px-8 py-2 flex justify-around items-center rounded-md full border-2">
              <IoArrowBackOutline />
              Back
            </button>
          </div>
          <h1 className="font-bold text-3xl text-gray-600">Create A New Post</h1>
          <input
            className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
            type="text"
            value={title}
            placeholder="Write a title for your post"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full h-52 p-4"
            type="text"
            value={content}
            placeholder="Write your post here"
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="w-full text-right">
            <button type="submit" className="px-8 py-4 bg-pink-400 text-white font-bold rounded-md">Create</button>
          </div>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <div className="w-1/2 flex flex-col h-full justify-center items-center">
        <img src={typing} alt="typerwriter" className="w-4/5 h-4/5" />
      </div>
    </div>
  );
};

export default CreatePost;
