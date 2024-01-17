import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import loginBanner from '../assets/img/login_banner.svg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmationLink, setConfirmationLink] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const triggerResetEmail = async () => {
    if (email === '') {
      setError('Please enter your email address');
      return;
    }
    await sendPasswordResetEmail(auth, email);
    setConfirmationLink('Password reset email sent');
  };

  return (
    <>
      <div className="ml-8 mt-8 text-pink-400 text-3xl font-semibold">
        <h1>TweetX</h1>
      </div>
      <div className="w-full flex justify-between items-center h-screen">
        <div className="flex flex-col gap-8 w-1/2 h-screen px-8 mt-12">
          <NavLink to="/signup" className="w-full text-left">
            <button type="submit" className="px-16 py-2 border border-gray-800 rounded-md font-bold">
              Create Account
            </button>
          </NavLink>
          <h1 className="font-bold text-3xl text-gray-600">Login</h1>
          <p>Please sign in using your email and password.</p>
          <form className="flex flex-col gap-4 w-3/4">
            <div>
              <input
                className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                className="bg-gray-50 text-gray-900 text-md rounded-lg block w-full p-4"
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full flex justify-between items-end">
              <div>
                Forgot password? click
                {' '}
                <button type="submit" onClick={triggerResetEmail} className="text-blue-800">here</button>
                {' '}
                to reset.
              </div>
              <button
                type="submit"
                onClick={onLogin}
                className="px-8 py-4 bg-pink-400 text-white rounded-md font-bold"
              >
                Login
              </button>
            </div>

          </form>
          {error ? <p>{error}</p> : null}
          {confirmationLink ? <p>{confirmationLink}</p> : null}
        </div>
        <div className="w-1/2 h-screen">
          <img src={loginBanner} className="object-fit contain object-top w-3/4" alt="login_banner" />
        </div>
      </div>
    </>
  );
};

export default Login;
