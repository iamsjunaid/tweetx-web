import React, { useState, useEffect } from 'react';
import { FaPowerOff } from 'react-icons/fa6';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  // const [activeLink, setActiveLink] = useState('feed');

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
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

  const handleLinkClick = (path) => {
    switch (path) {
      case 'feed':
        navigate('/home');
        break;
      case 'users':
        navigate('/users');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        navigate('/home');
    }
  };

  return (
    <>
      {
        loggedIn ? (
          <nav className="flex justify-around items-center px-12 py-4 shadow-md">
            <div className=" text-pink-400 text-3xl font-semibold">
              <h1>TweetX</h1>
            </div>
            <ul className="flex list-none justify-around items-center gap-12">
              <li className="font-bold text-xl text-gray-500">
                <button type="button" onClick={() => handleLinkClick('feed')}>
                  Feed
                </button>
              </li>
              <li className="font-bold text-xl text-gray-500">
                <button type="button" onClick={() => handleLinkClick('users')}>Users</button>
              </li>
              <li className="font-bold text-xl text-gray-500">
                <button type="button" onClick={() => handleLinkClick('profile')}>Profile</button>
              </li>
              <li>
                <button type="button" id="logoutButton" className="flex items-center gap-1 font-bold text-xl text-gray-500" onClick={handleLogout}>
                  Logout
                  {' '}
                  <FaPowerOff />
                </button>
              </li>
            </ul>
          </nav>
        ) : (
          <div>
            <h1>
              {`Please login first: ${error}`}
            </h1>
          </div>
        )
      }
    </>
  );
};

export default Navbar;
